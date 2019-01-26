;
"use strict";
//Функция закрывает доступ пользователю "Гость" к покупке контента;
let changeCheckboxes = function(obj) {
    if (obj == 'Guest') {
        let checkboxes = document.getElementsByTagName('input');
        console.log(checkboxes.length);
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].type == 'checkbox') {
                console.log(checkboxes[i]);
                checkboxes[i].style.visibility = 'hidden';
            }
        }
    }
};
//Асинхронный запрос БД контента, по результатам которого в список добавляется весь доступный контент;
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
                li.appendChild(buyCheckbox);
                document.getElementById('contentList').appendChild(li);
            }

        }
        let currentUser = currentUserRequest();
        changeCheckboxes(currentUser);
    }
};
//Синхронный запрос на тип текущего пользователя;
function currentUserRequest() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/currentUser', false);
    xhr.send();
    if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        return xhr.responseText;
    }
};



window.onload = () => {
    contextRequest();
};