window.onload = ()=>{
  console.log('test static script works normal!');
  let button = document.createElement('button');
  document.body.appendChild(button);
  button.innerHTML = 'Go to Sigh in';
  button.style.width = '20%';
  button.style.height = '5%';
  button.onclick = ()=>{
     document.location.href = '/sighIn';
  };
};