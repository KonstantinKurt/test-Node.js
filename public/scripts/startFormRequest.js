;
"use strict";
let contextRequest = function() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/content', true);
        xhr.send();
        xhr.onreadystatechange = function() { // (3)
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                alert(xhr.responseText);
            }
        }
};







        window.onload = () => {
            contextRequest();
        };