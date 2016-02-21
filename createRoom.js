var createRoom = function (roomID){
	var dataRef = new Firebase('https://ecosystem32.firebaseio.com/EcoSystems');
	dataRef.once("value", function(snapshot));
	for(var key in snapshot.val()){
		console.log(key)
		if (key === roomID ) 
			return false;
	}
    dataRef.push({
    	roomID{
    		config{
    			"key" : roomID
    		}
    	}
    });
    return true;
    
}