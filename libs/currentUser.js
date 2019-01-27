let currentUser = {
    "name": "Guest",
    "password": "",
    "isAdmin": false
};

exports.getCurrentUserName = function() {
    return currentUser.name;
};
exports.getCurrentUser = function(){
	return currentUser;
}
exports.setCurrentUser = function(obj) {
    currentUser = {};
    for (let i in obj) {
        currentUser[i] = obj[i];
    }
};