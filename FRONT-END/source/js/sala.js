// Función para activar/desactivar el menú hamburguesa
document.querySelector('.header__menu-toggle').addEventListener('click', function () {
    // Alterna la clase 'nav--menu-active' para abrir o cerrar el menú
    document.querySelector('.nav').classList.toggle('nav--menu-active');
});

// Cerrar el menú al hacer clic en el botón de cierre
document.querySelector('.nav__close-button').addEventListener('click', function () {
    // Remueve la clase 'nav--menu-active' para cerrar el menú
    document.querySelector('.nav').classList.remove('nav--menu-active');
});

// Funcionalidad del botón "Atrás"
document.getElementById('back-btn').addEventListener('click', function () {
    window.history.back();
});

// Funcionalidad para fijar el footer al hacer scroll
window.addEventListener('scroll', function () {
    const footerTop = document.querySelector('.footer__top');
    const footer = document.querySelector('.footer');
    
    // Asegurarse de que el footerTop existe en el DOM
    if (!footerTop) return;

    const footerTopHeight = footerTop.offsetHeight;
    const footerOffsetTop = footer.offsetTop; // Posición superior del footer
    const viewportHeight = window.innerHeight;
    const scrollPosition = window.scrollY;

    // Si el scroll aún no llega al footer
    if (scrollPosition + viewportHeight < footerOffsetTop) {
        footerTop.style.position = 'fixed';
        footerTop.style.bottom = '0';
        footerTop.style.top = 'auto';
    } 
    // Si el scroll llega al footer
    else {
        footerTop.style.position = 'absolute';
        footerTop.style.bottom = 'auto';
        footerTop.style.top = `${footerOffsetTop - footerTopHeight}px`; // Ajusta justo encima del footer
    }
});

// Acción del botón "CONTINUAR"
document.getElementById('continue-btn').addEventListener('click', function () {
    // Redirigir al usuario a la siguiente página
    window.location.href = '/FRONT-END/source/html/resumen-compra.html';
});
