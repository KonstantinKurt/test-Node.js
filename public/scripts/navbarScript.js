// Скрипт подключается к макету представлений и обработывает кнопки в панели навигации(navbar);
"use strict";
  let buttons = document.getElementsByTagName('button');
  buttons[0].onclick = ()=>{
     document.location.href = '/logIn';
  };
  buttons[1].onclick = ()=>{
     document.location.href = '/sighIn';
  };