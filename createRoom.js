window.createRoom = function (roomID){
    var roomPromise = new Promise(function(resolve, reject){

        var dataRef = new Firebase('https://ecosystem32.firebaseio.com/EcoSystems');
        dataRef.once("value", function(snapshot){
            for(var key in snapshot.val()){
                console.log(key)
                if (key === roomID)
                    resolve(false);
            }
            dataRef.push({
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