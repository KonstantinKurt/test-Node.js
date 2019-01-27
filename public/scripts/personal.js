;
"use strict";
function getStartStylesByUser(){
     let currentUser = currentUserRequest();
     console.log(currentUser);
     console.log(currentUser.isAdmin);
     if(currentUser.isAdmin == true){
     	document.getElementById('usersList').style.visibility = 'visible';
     }
};






window.onload = () => {
    getStartStylesByUser();
};