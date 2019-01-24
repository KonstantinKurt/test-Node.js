//Скрипт создает элемент "img" и стилизует его для представления ответов со статусом 404 и 500;
window.onload =()=>{
   let image  = document.createElement('img');
   document.body.appendChild(image);
   image.style.position = 'absolute';
   image.style.width = '70%';
   image.style.height = '40%'
   image.style.left = '15%';
   image.src = 'img/error.jpg';
   image.style.borderRadius = '2%';
   document.getElementById('currentUserSpan').style.visibility = 'hidden';
}; 