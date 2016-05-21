// Initialize Firebase
var config = {
	apiKey: "AIzaSyATujoUpLd59nEDATfncvJPOUrRMqm9oz8",
	authDomain: "ecosystem32-37920.firebaseapp.com",
	databaseURL: "https://ecosystem32-37920.firebaseio.com",
	storageBucket: "ecosystem32-37920.appspot.com"
};
firebase.initializeApp(config);

console.log("Ecosystem32 is in Multiplayer Mode.");

firebase.auth().onAuthStateChanged(function(user){
	console.log('Auth state changed.');
	if(user){
		//User Signed In
		listUsers();
		listRooms();
		toggleModules('none', ['login']);
		toggleModules('block', ['logout', 'room-finder']);
	}
	else{
		//User Signed Out
		toggleModules('none', ['logout', 'room-finder', 'room']);
		toggleModules('block', ['login']);
	}
});

function toggleModules(setting, modules){
	for(var i in modules){
		var module = modules[i];
		if(module){
			var target = document.getElementById(module + '-module');
			target.style.display = setting;
		}
	}
}



$('#room-submit').click(function(event){
	var output = document.getElementById('room-module');
	var roomId = event.target.previousElementSibling.value;
	toggleModules('none', ['room-finder']);
	toggleModules('block', ['room']);
	console.log(roomId);
	var promise = RoomPromise(roomId);
	promise.then(function(room){
		console.log(room);
		output.innerHTML = room.html();
		listRooms();
	});
});
