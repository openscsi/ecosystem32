var userID;
var authObject;

function checkUserInDatabase(authData){
	userID = authData.user.uid;
	var userData = {
		uid: userID,
		name: authData.user.displayName,
		email: authData.user.email,
		img: authData.user.photoURL
	}
	var path = "users/" + userID;
	var userRef = firebase.database().ref(path);
	userRef.once('value', function(snapshot){
		if(!snapshot.exists()){
			//New User
			var userDataRoute = firebase.database().ref(path + "/auth");
			userDataRoute.set(userData);
		}
		else{
			//Returning User
		}
	});
}

function googleLogin(){
	var auth = firebase.auth();
	var provider = new firebase.auth.GoogleAuthProvider();
	auth.signInWithPopup(provider).then(function(authData){
		console.log(authData);
		authObject = authData;
		checkUserInDatabase(authData);
	}).catch(function(error){
		console.log("An error occured during login.");
		console.log(error);
	});
}