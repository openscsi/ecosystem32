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
	}
	else{
		//User Signed Out
	}
});


function listUsers(){
	var output = document.getElementById('user-list');
		output.innerHTML = '';
	var userRef = firebase.database().ref('users');
	userRef.once('value', function(snapshot){
		var users = snapshot.val();
		for(var i in users){
			var user = users[i].auth;
			var html = '<li>' + user.name + '</li>';
			output.innerHTML += html;
		}
	});
}