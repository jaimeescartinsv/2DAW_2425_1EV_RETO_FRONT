// Función para activar/desactivar el menú hamburguesa
document.querySelector('.header__menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav').classList.toggle('nav--menu-active');
});




window.addEventListener('scroll', function () {
  const footerTop = document.querySelector('.footer__top');
  const footer = document.querySelector('.footer');
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










  
  document.querySelector('.header__menu-toggle').addEventListener('click', function () {
    document.querySelector('.nav').classList.add('nav--menu-active');
});

document.querySelector('.nav__close-button').addEventListener('click', function () {
    document.querySelector('.nav').classList.remove('nav--menu-active');
});


  




//peli-info (seleccion de cines)

document.addEventListener("DOMContentLoaded", () => {
    const cinemaSelect = document.querySelector(".movie__cinema-select");
    const scheduleWarning = document.querySelector(".movie__schedule-warning");
  
    cinemaSelect.addEventListener("change", (event) => {
      const selectedCinema = event.target.value;
  
      if (selectedCinema) {
        scheduleWarning.textContent = `Has seleccionado el cine: ${selectedCinema}. Los horarios estarán disponibles pronto.`;
        scheduleWarning.style.color = "#000";
      } else {
        scheduleWarning.textContent = "Por favor, selecciona un cine para ver las sesiones.";
        scheduleWarning.style.color = "#666";
      }
    });
  });