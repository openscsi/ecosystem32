function UserPromise(userId){
	var promise = new Promise(function(resolve, reject){
		var userPath = 'users/' + userId;
		var userRef = firebase.database().ref(userPath);
		userRef.once('value', function(userSnap){
			var user = User(userSnap.val());
			resolve(user);
		});
	});
	return promise;
}

function User(data){
	var user = data;
	user.toString = function(){
		return userToString(user);
	}
	user.listHTML = function(stringFn){
		return userToListHTML(user, stringFn);
	}
	return user;
}

function listUsers(){
	var output = document.getElementById('user-list');
		output.innerHTML = '';
	var userRef = firebase.database().ref('users');
	userRef.once('value', function(snapshot){
		var users = snapshot.val();
		for(var i in users){
			var user = User(users[i]);
			var html = user.listHTML();
			output.innerHTML += html;
		}
	});
}

function userToString(user){
	var string = user.auth.name;
	if(user.auth.uid === firebase.auth().currentUser.uid){
		string += ' (You)';
	}
	return string;
}

function userToListHTML(user, stringFn){
	var profile = user.auth;
	var html = '';
	var img = '<img src="' + profile.img + '">'
	var string;
	if(stringFn){
		string = '<div>' + stringFn(user) + '</div>';
	}
	else{
		string = '<div>' + user.toString() + '</div>';
	}
	html += '<div class="user-list-box">' + img + string + '</div>';
	return html;
}

function addAnimal(data){
	var userId = firebase.auth().currentUser.uid;
	var path = 'users/' + userId + '/animals';
	var animalsRef = firebase.database().ref(path);
	animalsRef.push(data);
}