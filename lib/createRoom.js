window.createRoom = function (roomID){
    var roomPromise = new Promise(function(resolve, reject){
        if(roomID <= 0)
            return resolve(false);
        var dataRef = new Firebase('https://ecosystem32.firebaseio.com/EcoSystems');
        dataRef.once("value", function(snapshot){
            for(var key in snapshot.val()){
                console.log(key)
                console.log(roomID)
                if (key === roomID){
                    console.log("taken")
                   return resolve( false);
               }
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
            console.log("free")
            return resolve(true);
        });

    });
    return roomPromise;
}