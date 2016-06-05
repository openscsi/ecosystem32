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

function Animal(data){
	var animal = data;
	animal.toString = function(){
		return animal.name;
	}
	animal.listHTML = function(stringFn){
		return animalToListHTML(animal, stringFn);
	}
	return animal;
}

function listAnimals(){
	var output = document.getElementById('animal-list');
		output.innerHTML = '';
	var uid = firebase.auth().currentUser.uid;
	var animalsRef = firebase.database().ref('users/' + uid + '/animals');
	animalsRef.once('value', function(snapshot){
		var animals = snapshot.val();
		for(var i in animals){
			var animal = Animal(animals[i]);
			var html = animal.listHTML();
			output.innerHTML += html;
		}
	});
}

function addAnimal(data){
	var userId = firebase.auth().currentUser.uid;
	var path = 'users/' + userId + '/animals';
	var animalsRef = firebase.database().ref(path);
	animalsRef.push(data);
}

function animalToListHTML(animal, stringFn){
	var html = '';
	var img = '<div class="letter-img" style="background-color: ' + animal.color + ';">' + animal.type.substr(0, 1).toUpperCase() + '</div>'
	var string;
	if(stringFn){
		string = '<div>' + stringFn(animal) + '</div>';
	}
	else{
		string = '<div>' + animal.toString() + '</div>';
	}
	html += '<div class="user-list-box">' + img + string + '</div>';
	return html;
}