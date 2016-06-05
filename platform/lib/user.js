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
	if(user.animals){
		var animalsList = [];
		for(var i in user.animals){
			if(user.animals[i]){
				user.animals[i].id = i;
				animalsList.push(user.animals[i]);
			}
		}
		user.animals = animalsList;
	}
	else{
		user.animals = [];
	}
	user.toString = function(){
		return userToString(user);
	}
	user.listHTML = function(stringFn, classes){
		return userToListHTML(user, stringFn, classes);
	}
	user.animalSelectorHTML = function(){
		return animalSelectorHTML(user);
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
			var html = user.listHTML(function(user){
				var str = user.auth.name + ' ';
				if(user.animals){
					if(user.animals.length === 1){
						str += '(1 animal)';
					}
					else{
						str += '(' + user.animals.length + ' animals)';
					}
				}
				else{
					str += '(no animals)';
				}
				return str;
			});
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

function userToListHTML(user, stringFn, classes){
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
	if(classes){
		html += '<div class="user-list-box ' + classes + '">' + img + string + '</div>';
	}
	else{
		html += '<div class="user-list-box">' + img + string + '</div>';
	}
	return html;
}

function animalSelectorHTML(user){	
	var html = '';
		html += '<select class="select-animal" id="select-' + user.auth.uid + '">'
		html += '<option value="default" selected>Choose an Animal</option>';
		if(user.animals.length > 0){
			for(var i = 0; i < user.animals.length; i++){
				var animal = user.animals[i];
				var aid = "'" + animal.id + "'";
				html += '<option value="' + aid + '">' + animal.name + ' (' + animal.type + ')</option>';
			}
		}
		else{
			html += '<option value="no_animals_error">No Animals</option>';
		}
		html += '<select>'
	return html
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

function editAnimal(aid){
	sessionStorage.setItem('user_animal_key', aid);	
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
	var aid = "'" + animal.id + "'";
	var button = '<button onclick="editAnimal(' + aid + ');">Edit</button>';
	html += '<div class="user-list-box">' + img + string + button + '</div>';
	return html;
}