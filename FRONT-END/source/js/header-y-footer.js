// Función para activar/desactivar el menú hamburguesa
document.querySelector('.header__menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav').classList.toggle('nav--menu-active');
});


window.addEventListener('scroll', function() {
    const footerTop = document.querySelector('.footer__top');
    const footerBottom = document.querySelector('.footer__bottom');
    const footerTopHeight = footerTop.offsetHeight;
    const footerBottomTop = footerBottom.offsetTop;
    const scrollPosition = window.scrollY + window.innerHeight;
  
    // Cuando el usuario hace scroll hacia abajo, mantener el footer-top centrado
    if (scrollPosition < footerBottomTop) {
      footerTop.classList.remove('footer__top-sticky');
    } else {
      // Al llegar al final del contenido, hacer que el footer-top se quede encima del footer__bottom
      footerTop.classList.add('footer__top-sticky');
    }
  });
  
  document.querySelector('.header__menu-toggle').addEventListener('click', function () {
    document.querySelector('.nav').classList.add('nav--menu-active');
});

document.querySelector('.nav__close-button').addEventListener('click', function () {
    document.querySelector('.nav').classList.remove('nav--menu-active');
});


  