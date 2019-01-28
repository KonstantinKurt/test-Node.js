;
"use strict";
let sighInRequest = function() {
    let inputs = document.getElementsByTagName('input');
    let checkbox = document.getElementById('isAdmin');
    let admin = false;
    if (inputs[0].value.length < 5) {
        alert('Too short login!');
        inputs[0].value = "";
        return;
    }
    if (inputs[1].value != inputs[2].value) {
        alert('Repeat password correctly!');
        inputs[1].value = '';
        inputs[2].value = '';
        return;
    }
    if (inputs[1].value.length < 5) {
        alert('Too easy password!');
        inputs[1].value = '';
        inputs[2].value = '';
        return;
    }
    if(checkbox.checked){
       admin = true;
    }
    if (inputs[0].value != "" && inputs[1].value != 0) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/sighnInUser');
        let user = {
            name: inputs[0].value,
            password: inputs[1].value,
            isAdmin: admin
        };
        xhr.setRequestHeader('Content-type', "application/json");
        xhr.send(JSON.stringify(user));
        xhr.onload = () => {
            alert(xhr.responseText);
            if (xhr.status == 200) {
                document.location.href = '/';
            }
        }
        xhr.error = () => {
            alert('Server error!');
        }
    } else {
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value == "") {
                inputs[i].style.borderColor = 'red';
            }
        }
        alert('Not all fields filled!');
        return;
    }
};
let sighInButton = function() {
    let button = document.getElementById('sighInbutton');
    button.onclick = sighInRequest;
};

window.onload = () => {
    sighInButton();
};