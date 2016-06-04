var FIREBASE_DATA = null;

window.firebase = {

	apiKey: null,
	authDomain: null,
	databaseURL: null,
	storageBucket: null,

	initializeApp: function(config){
		this.apiKey = config.apiKey;
		this.authDomain = config.authDomain;
		this.databaseURL = config.databaseURL;
		this.storageBucket = config.storageBucket;
	},

	database: function(){
		console.log('fake-database');
	},

	auth: function(){
		return Auth();
	}

}

function Auth(){
	return {

		onAuthStateChanged: function(callback){
			var userInfo = 'fake-userInfo';
			if(callback){
				callback(userInfo);
			}
		},

		GoogleAuthProvider: function(){
			console.log('fake-GoogleAuthProvider');
		},

		signInWithPopup: function(provider){
			return new Promise(function(resolve, reject){
				var authData = 'fake-authData';
				resolve(authData);
			});
		}

	}
}