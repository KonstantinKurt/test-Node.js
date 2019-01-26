;
"use strict";
let logInRequest = function() {
    let inputs = document.getElementsByTagName('input');
    if (inputs[0].value != "" && inputs[1].value != 0) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/logInUser');
        let user = {
            name: inputs[0].value,
            password: inputs[1].value
        };
        xhr.setRequestHeader('Content-type', "application/json");
        xhr.send(JSON.stringify(user));
        xhr.onload = () => {
            alert(xhr.responseText);
            if (xhr.status == 200) {
                document.location.href = '/personal';
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
let loginButton = function() {
    let button = document.getElementById('loginButton');
    button.onclick = logInRequest;
};

window.onload = () => {
    loginButton();
};