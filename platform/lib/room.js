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
				return UserPromise(userId);
			});
			Promise.all(userPromises).then(function(users){
				room.users = users;
				resolve(Room(room));
			});
		});
	});
	return promise;
}

function Room(data){
	var room = data;
	room.html = function(){
		return roomToHTML(room);
	}
	room.listHTML = function(){
		return roomToListHTML(room);
	}
	return room;
}

function listRooms(){
	var output = document.getElementById('room-list');
		output.innerHTML = '';
	var userRef = firebase.database().ref('rooms');
	userRef.once('value', function(snapshot){
		var rooms = snapshot.val();
		for(var i in rooms){
			var room = Room(rooms[i]);
			var html = room.listHTML();
			output.innerHTML += html;
		}
	});
}

function leaveRoom(roomId){
	var userId = firebase.auth().currentUser.uid;
	var path = 'rooms/' + roomId + '/users';
	var roomRef = firebase.database().ref(path);
	roomRef.once('value', function(snapshot){
		var users = snapshot.val();
		var index = users.indexOf(userId);
		if(index > -1){
			users.splice(index, 1);
			roomRef.set(users);
			toggleModules('block', ['room-finder']);
			toggleModules('none', ['room']);
			listRooms();
		}
	});
}

function getAnimalsMap(roomId){
	var path = 'rooms/' + roomId;
	var roomRef = firebase.database().ref(path);
	roomRef.once('value', function(roomSnap){
		var room = roomSnap.val();
		var selectors = document.getElementsByClassName('select-animal');
		for(var i = 0; i< selectors.length; i++){
			var index = selectors[i].value;
			var c = room.users[i].animals[index]
			console.log(c)
		}
	});
}

function startRoom(roomId){
	var aniMap = getAnimalsMap();
}

function roomToListHTML(room){
	var html = '';
	var playerString = ', ';
	if(room.users.length === 0){
		playerString += 'no players.';
	}
	else if(room.users.length === 1){
		playerString += '1 player.';
	}
	else{
		playerString += room.users.length + ' players.';
	}
	html += '<li class="room-list-box">Room ID: ' + room.id + playerString + '</li>';
	return html;
}

function roomToHTML(room){
	var html = '';
	html += '<h3>Room: ' + room.id + '</h3>';
	html += '<div id="room-users-module">';
	for(var i in room.users){
		var user = room.users[i];
		html += user.listHTML(function(user){
			var userString = user.toString();
			if(user.auth.uid === room.ownerId){
				userString += ' (Owner)';
			}
			userString += user.animalSelectorHTML();
			return userString;
		}, 'long-box');
	}
	var roomId = "'" + room.id + "'";
	html += '<div class="button-wrapper">';
	html += '<button onclick="leaveRoom(' + roomId + ')">Leave Room</button>';
	html += '<button onclick="startRoom(' + roomId + ')">Start Match</button>';
	html += '</div>';
	html += '</div>';
	return html;
}