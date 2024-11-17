// ABRIR MENÚ HAMBURGUESA
document.querySelector('.header__menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav').classList.toggle('nav--menu-active');
});

//ANIMACION MENÚ HAMBURGUESA???
document.querySelector('.header__menu-toggle').addEventListener('click', function () {
  document.querySelector('.nav').classList.add('nav--menu-active');
});

//CIERRE MENÚ HAMBURGUESA
document.querySelector('.nav__close-button').addEventListener('click', function () {
  document.querySelector('.nav').classList.remove('nav--menu-active');
});



//PARTE SECCIÓN RAPIDA (FOOTER__TOP)
window.addEventListener('scroll', function() {
  const footerTop = document.querySelector('.footer__top');
  const footerBottom = document.querySelector('.footer__bottom');
  const footerBottomTop = footerBottom.getBoundingClientRect().top;
  const viewportHeight = window.innerHeight;

  // Cuando el scroll llega al footer__bottom
  if (footerBottomTop <= viewportHeight) {
      footerTop.classList.add('footer__top--sticky');
  } else {
      footerTop.classList.remove('footer__top--sticky');
  }
});

