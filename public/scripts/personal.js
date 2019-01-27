;
"use strict";
let boughtContent;

function getStartStylesByUser() {
    let currentUser = currentUserRequest();
    contextRequest();
    if (currentUser.isAdmin == true) {
        document.getElementById('userDiv').style.visibility = 'visible';
        document.getElementById('addContent').style.visibility = 'visible';
        document.getElementById('deleteUser').style.visibility = 'visible';
        usersRequest();
        let buttonAddContent = document.getElementById('addContentButton');
        buttonAddContent.onclick = addContent;
        let buttonDeleteUser = document.getElementById('deleteUserButton');
        buttonDeleteUser.onclick = deleteUser;
    } else {
        let buttonBuy = document.getElementById('buyContentButton');
        buttonBuy.style.visibility = 'visible';
        buttonBuy.onclick = buyContent;
        let buttonClear = document.getElementById('clearBuyList');
        buttonClear.style.visibility = 'visible';
        buttonClear.onclick = clearContent;
        document.getElementById('boughtContent').style.visibility = 'visible';
    }
};
let addToBoughtContentList = function() {
    if (this.checked == true) {
        let tempStr = this.parentElement.innerHTML.split('<')[0];
        boughtContent = tempStr;
    }
};
let deleteUser = function() {
    console.log('ok');
    let deleteUserInput = document.getElementById('deleteUserInput');
    if (deleteUserInput.value != '') {
       
        let xhr = new XMLHttpRequest();
        let user = {
            name: deleteUserInput.value
        };
        console.log(user);
        xhr.open('POST', '/deleteUser');
        xhr.setRequestHeader('Content-type', "application/json");
        xhr.send(JSON.stringify(user));
        xhr.onload = () => {
            if (xhr.status == 200) {
                let response = JSON.parse(xhr.responseText);
                alert(`User ${response.name} deleted!`);
                let list = document.getElementById('usersList');
                list.innerHTML = '';
                usersRequest();
            }
        }
        xhr.error = () => {
            alert('Server error!');
        }
    }
    else{
        alert('input users name!');
    }
};

let addContent = function() {
    let name = document.getElementById('contantName');
    let price = document.getElementById('contantPrice');
    if (name.value != "" && price.value != "") {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/addContent');
        let newContent = {
            name: name.value,
            price: price.value
        };
        xhr.setRequestHeader('Content-type', "application/json");
        xhr.send(JSON.stringify(newContent));
        xhr.onload = () => {
            if (xhr.status == 200) {
                let response = JSON.parse(xhr.responseText);
                alert(`Added content ${response.name} price ${response.price}`);
                let list = document.getElementById('contentList');
                list.innerHTML = '';
                contextRequest();
            }
        }
        xhr.error = () => {
            alert('Server error!');
        }
     }
     else
     {
         alert('Not all fields filled!');
        return;
     }
};
let buyContent = function() {
    let confirmBuy = confirm(`Are you sure you want to buy ${boughtContent}?`);
    if (confirmBuy) {
        let xhr = new XMLHttpRequest();
        let content = {
            name: boughtContent
        };
        xhr.open('POST', '/deleteBoughtContent');
        xhr.setRequestHeader('Content-type', "application/json");
        xhr.send(JSON.stringify(content));
        xhr.onload = () => {
            if (xhr.status == 200) {
                let response = JSON.parse(xhr.responseText);
                alert(`Bought ${response.name} by price ${response.price}`);
                let list = document.getElementById('contentList');
                list.innerHTML = '';
                contextRequest();
                let listBought = document.getElementById('boughtContentList');
                let li = document.createElement('li');
                li.innerHTML = boughtContent;
                listBought.appendChild(li);
            }
        }
        xhr.error = () => {
            alert('Server error!');
        }

    } else {
        return;
    }


};
let clearContent = function() {
    let list = document.getElementById('boughtContentList');
    list.innerHTML = '';
    let checkboxes = document.getElementsByTagName('input');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox') {
            checkboxes[i].disabled = false;
            checkboxes[i].checked = false;
        }
    }
    boughtContent = [];
};
let usersRequest = function() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/users', true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            let responseArray = JSON.parse(xhr.responseText);
            for (let i = 0; i < responseArray.length; i++) {
                let li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                li.innerHTML = `${responseArray[i].name}`;
                let spanPassword = document.createElement('span');
                spanPassword.setAttribute('class', 'position');
                spanPassword.innerHTML = `${responseArray[i].password}`;
                li.appendChild(spanPassword);
                let spanIsAdmin = document.createElement('span');
                spanIsAdmin.setAttribute('class', 'position');
                spanIsAdmin.style.left = '81%';
                if (responseArray[i].isAdmin == true) {
                    spanIsAdmin.style.color = 'red';
                }
                spanIsAdmin.innerHTML = `${responseArray[i].isAdmin}`;
                li.appendChild(spanIsAdmin);
                document.getElementById('usersList').appendChild(li);
            }
        }
    }
};
let contextRequest = function() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/content', true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            let responseArray = JSON.parse(xhr.responseText);
            for (let i = 0; i < responseArray.length; i++) {
                let li = document.createElement('li');
                li.setAttribute('class', 'list-group-item');
                li.innerHTML = `${responseArray[i].name}`;
                let spanPrice = document.createElement('span');
                spanPrice.setAttribute('class', 'position');
                spanPrice.innerHTML = `${responseArray[i].price}`;
                li.appendChild(spanPrice);
                let buyCheckbox = document.createElement('input');
                buyCheckbox.type = 'checkbox';
                buyCheckbox.setAttribute('class', 'position');
                buyCheckbox.style.left = '81%';
                buyCheckbox.addEventListener('click', addToBoughtContentList);
                li.appendChild(buyCheckbox);
                document.getElementById('contentList').appendChild(li);
            }
        }
    }
};





window.onload = () => {
    getStartStylesByUser();
};