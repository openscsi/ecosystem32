function RoomPromise(roomId){
	var room;
	var userId = firebase.auth().currentUser.uid;
	var path = 'rooms/' + roomId;
	var roomRef = firebase.database().ref(path);
	var promise = new Promise(function(resolve, reject){
		roomRef.once('value', function(snapshot){
			if(!snapshot.exists()){
				//New Room
				room = {
					id: roomId,
					ownerId: userId,
					users: [userId]
				}
				roomRef.set(room);
			}
			else{
				//Existing Room
				room = snapshot.val();
				if(!room.users.includes(userId)){
					room.users.push(userId);
					roomRef.set(room);
				}
			}
			var userPromises = room.users.map(function(userId){
				return new Promise(function(resolve, reject){
					var userPath = 'users/' + userId;
					var userRef = firebase.database().ref(userPath);
					userRef.once('value', function(userSnap){
						resolve(userSnap.val());
					});
				});
			});
			room.html = function(){
				return roomToHTML(room);
			}
			Promise.all(userPromises).then(function(users){
				room.users = users;
				resolve(room);
			});
		});
	});
	return promise;
}

function roomToHTML(room){
	var html = '';
	html += '<h3>Room: ' + room.id + '</h3>';
	html += '<ul>';
	for(var i in room.users){
		var user = room.users[i].auth;
		var userString = user.name;
		if(user.uid === room.ownerId){
			userString += ' (Owner)';
		}
		if(user.uid === firebase.auth().currentUser.uid){
			userString += ' (You)';
		}
		html += '<li>' + userString + '</li>';
	}
	html += '</ul>';
	return html;
}