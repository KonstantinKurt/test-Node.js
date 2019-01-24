window.onload = ()=>{
  let buttons = document.getElementsByTagName('button');
  buttons[0].onclick = ()=>{
     document.location.href = '/logIn';
  };
  buttons[1].onclick = ()=>{
     document.location.href = '/sighIn';
  };
};