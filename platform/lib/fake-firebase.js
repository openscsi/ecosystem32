window.FIREBASE_DATA = null;

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
		return Database();
	},

	auth: function(){
		return window.firebaseAuth;
	},

	printState: function(){
		console.warn('Firebase State:');
		console.log(JSON.stringify(FIREBASE_DATA));
	}

}

firebase.auth.GoogleAuthProvider = function(){
	return {
		authData: {
			uid: "10002034164209746382",
			user: {
				"email" : "faraz@gmail.com",
				"img" : "./style/img/faraz.png",
				"name" : "Faraz Awad",
				"uid" : "10002034164209746382"
			}
		}
	}
}

window.firebaseAuth = {

	currentUser: {
		uid: null
	},

	authStateChangeCallback: function(){
		// Fake Auth Status Change
	},

	onAuthStateChanged: function(callback){
		this.authStateChangeCallback = callback;
		this.authStateChanged();
	},

	authStateChanged: function(){
		var user = this.currentUser.uid ? true : false;
		this.authStateChangeCallback(user);
	},

	signInWithPopup: function(provider){
		var authData = provider.authData;
		this.currentUser = authData;
		this.authStateChanged();
		return new Promise(function(resolve, reject){
			resolve(authData);
		});
	},

	signOut: function(){
		this.currentUser = {
			uid: null
		};
		this.authStateChanged();
	}

}

function Database(){
	return {

		traverse: function(path, payload){
			var pathList = path.split('/');
			var dbData = FIREBASE_DATA;
			var termination = payload ? pathList.length - 1 : pathList.length;
			for(var p = 0; p < termination; p++){
				if(dbData[pathList[p]]){
					dbData = dbData[pathList[p]];
				}
				else if(payload){
					dbData[pathList[p]] = {};
					dbData = dbData[pathList[p]];
				}
				else{
					return Snapshot(null, path);
				}
			}
			if(payload){
				dbData[pathList[pathList.length - 1]] = payload;
			}
			else{
				return Snapshot(dbData, path);
			}
		},

		ref: function(path){
			return this.traverse(path);
		}

	}
}

function Snapshot(data, path){
	return {

		exists: function(){
			if(data){
				return true;
			}
			else{
				return false;
			}
		},

		val: function(){
			return _.clone(data);
		},
		
		set: function(payload){
			Database().traverse(path, _.clone(payload));
		},

		once: function(callType, callback){
			if(callback){
				callback(this);
			}
		}

	}
}