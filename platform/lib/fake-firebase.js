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

function Database(){
	return {

		ref: function(path){
			var pathList = path.split('/');
			var data = FIREBASE_DATA;
			for(var p = 0; p < pathList.length; p++){
				data = data[pathList[p]];
			}
			return Snapshot(data);
		}

	}
}

function Snapshot(data){
	return {

		val: function(){
			return data;
		},

		once: function(callType, callback){
			if(callback){
				callback(this);
			}
		}

	}
}