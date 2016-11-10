var configuration = require('../../configuration/config');
var firebase = require('firebase');
firebase = configuration.setupFirebaseDatabase(firebase);

var createUser = function () {
    var newUserId = guid();

    firebase.database().ref('/users/' + newUserId).set({
        userId: newUserId
    });

    return newUserId;
}

var isUserPresent = function (userId) {
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot){
        var userName = snapshot.val().userId;
        if(userName)
            return true;
        return false;
    });
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

module.exports = {
    createUser: createUser,
    isUserPresent: function(userId){
        return isUserPresent(userId);
    }
};
