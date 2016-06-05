// Initialize Firebase
var config = {
	apiKey: "AIzaSyATujoUpLd59nEDATfncvJPOUrRMqm9oz8",
	authDomain: "ecosystem32-37920.firebaseapp.com",
	databaseURL: "https://ecosystem32-37920.firebaseio.com",
	storageBucket: "ecosystem32-37920.appspot.com"
};
firebase.initializeApp(config);
console.log("Ecosystem32 is in Multiplayer Mode.");

function toggleModules(setting, modules){
	for(var i in modules){
		var module = modules[i];
		if(module){
			var target = document.getElementById(module + '-module');
			if(target){
				target.style.display = setting;
			}
		}
	}
}

/*--------------------------------------------*/
/*---> MAIN PAGE <----------------------------*/
/*--------------------------------------------*/

function openRoom(roomKey){
	var output = document.getElementById('room-module');
	var roomId = roomKey || document.getElementById('room-key').value;
	toggleModules('none', ['room-finder']);
	toggleModules('block', ['room']);
	var promise = RoomPromise(roomId);
	promise.then(function(room){
		output.innerHTML = room.html();
		listRooms();
	});
}

function homeMain(){

	//Don't forget to change Firebase security rules so that non-authenticated visitors can read data!
	listUsers();
	listRooms();

	firebase.auth().onAuthStateChanged(function(user){
		console.log('Auth state changed.');
		if(user){
			//User Signed In
			toggleModules('none', ['login']);
			toggleModules('block', ['logout', 'room-finder', 'animal']);
			listAnimals();
		}
		else{
			//User Signed Out
			toggleModules('none', ['logout', 'room-finder', 'animal', 'room']);
			toggleModules('block', ['login']);
		}
	});

	var roomSubmit = document.getElementById('room-submit');
	roomSubmit.addEventListener('click', function(){
		openRoom();
	});

	var liveRoomRef = firebase.database().ref('rooms');
	liveRoomRef.on('value', function(snapshot){
		console.log('ROOMS CHANGED')
	});

}

/*--------------------------------------------*/
/*---> ANIMAL FORM <--------------------------*/
/*--------------------------------------------*/

function loadAnimal(data){

	var name = document.getElementById('name').value = data.name;
	var color = document.getElementById('color').value = data.color;
	var typeForms = document.getElementsByName('type');
	for(var t = 0; t < typeForms.length; t++){
		if(typeForms[t].value === data.type){
			typeForms[t].checked = true;
		}
	}
	var move = document.getElementById('editor').innerText = data.move;
	
	var genes = {};
	var GENE_LIST = ['size1', 'size2', 'speed1', 'speed2', 'markings1', 'markings2', 'fertility'];
	for(var g = 0; g < GENE_LIST.length; g++){
		var gene = GENE_LIST[g];
		document.getElementById(`${gene}-init`).value = data.genes[gene].init;
		document.getElementById(`${gene}-sdev`).value = data.genes[gene].sdev;
	}

	document.getElementById('preview-json').value = JSON.stringify(data);

}

function previewAnimal(){

	var name = document.getElementById('name').value;
	var color = document.getElementById('color').value;
	var typeForm = document.querySelector('input[name="type"]:checked');
	var type = typeForm ? typeForm.value : null;
	var move = document.getElementById('editor').innerText;
	
	var genes = {};
	var GENE_LIST = ['size1', 'size2', 'speed1', 'speed2', 'markings1', 'markings2', 'fertility'];
	for(var g = 0; g < GENE_LIST.length; g++){
		var gene = GENE_LIST[g];
		genes[gene] = {
			init: document.getElementById(`${gene}-init`).value,
			sdev: document.getElementById(`${gene}-sdev`).value
		}
	}
	
	return {
		name: name,
		color: color,
		type: type,
		move: move,
		genes: genes
	}

}

function formMain(){

	firebase.auth().onAuthStateChanged(function(user){
		console.log('Auth state changed.');
		if(user){
			//User Signed In
			if(sessionStorage.getItem('user_animal_key')){
				var aid = sessionStorage.getItem('user_animal_key');
				var uid = firebase.auth().currentUser.uid;
				var path = 'users/' + uid + '/animals/' + aid;
				var animalRef = firebase.database().ref(path);
				animalRef.once('value', function(snapshot){
					var animal = snapshot.val();
					loadAnimal(animal);
					sessionStorage.removeItem('user_animal_key');
				});
			}
		}
		else{
			//User Signed Out
			window.location.href = 'index.html';
		}
	});

	document.getElementById('submit-animal').addEventListener('click', function(){
		var json = previewAnimal();
		document.getElementById('preview-json').value = JSON.stringify(json);
		addAnimal(json);
		//window.location.href = 'index.html';
	});

	var watchers = document.getElementsByClassName('form-watch');
	for(var w = 0; w < watchers.length; w++){
		watchers[w].addEventListener('change', function(){
			var json = previewAnimal();
			document.getElementById('preview-json').value = JSON.stringify(json);
		});
	}

	var editor = ace.edit('editor');
	editor.setTheme('ace/theme/monokai');
	editor.getSession().setMode('ace/mode/javascript');

	editor.on('change', function(e){
		var json = previewAnimal();
		document.getElementById('preview-json').value = JSON.stringify(json);
	});

}