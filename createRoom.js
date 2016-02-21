window.createRoom = function (roomID){
    var roomPromise = new Promise(function(resolve, reject){

        var dataRef = new Firebase('https://ecosystem32.firebaseio.com/EcoSystems');
        dataRef.once("value", function(snapshot){
            for(var key in snapshot.val()){
                console.log(key)
                if (key === roomID)
                    resolve(false);
            }
            //If we get here, then the key is unique
            var newRef = new Firebase('https://ecosystem32.firebaseio.com/EcoSystems/' + roomID);
            newRef.set({
                roomID: {
                    config: {
                        "key" : roomID
                    }
                }
            });
            resolve(true);
        });

    });
    return roomPromise;
}