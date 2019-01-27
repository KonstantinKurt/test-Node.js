//Синхронный запрос на тип текущего пользователя;
let currentUserRequest = function() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/currentUser', false);
    xhr.send();
    if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        let currentUser = JSON.parse(xhr.responseText);
        return currentUser;
    }
};
let currentUserLogOut = function() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/logOut', false);
    xhr.send();
    if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        alert(xhr.responseText);
        document.location.href = '/';
    }
};