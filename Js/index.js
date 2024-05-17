const logo = document.getElementById('logo');
const navbarLeft = document.querySelector('.navbarLeft');
const spans = document.querySelectorAll('span');

logo.addEventListener('click', ()=> {
    navbarLeft.classList.toggle('ocultNavbarLeft');
    
    spans.forEach((span)=>{
        span.classList.toggle('ocult');
    })
})