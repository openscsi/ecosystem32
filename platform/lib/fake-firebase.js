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
		console.log('fake-auth');
	}

}