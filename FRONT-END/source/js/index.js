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


  

//INDEX

// JavaScript para funcionalidad del carrusel con desplazamiento infinito

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel__track");
    const prevButton = document.querySelector(".carousel__button--prev");
    const nextButton = document.querySelector(".carousel__button--next");
    const items = Array.from(track.children);
  
    let currentIndex = 0;
  
    const cloneItems = () => {
      const firstClone = items[0].cloneNode(true);
      const lastClone = items[items.length - 1].cloneNode(true);
  
      track.appendChild(firstClone);
      track.insertBefore(lastClone, items[0]);
    };
  
    cloneItems();
  
    const updateCarousel = () => {
      const width = items[0].getBoundingClientRect().width;
      track.style.transition = "transform 0.3s ease-in-out";
      track.style.transform = `translateX(-${(currentIndex + 1) * width}px)`;
    };
  
    const jumpToEdge = () => {
      const width = items[0].getBoundingClientRect().width;
      track.style.transition = "none";
      if (currentIndex === items.length) {
        currentIndex = 0;
        track.style.transform = `translateX(-${(currentIndex + 1) * width}px)`;
      } else if (currentIndex === -1) {
        currentIndex = items.length - 1;
        track.style.transform = `translateX(-${(currentIndex + 1) * width}px)`;
      }
    };
  
    nextButton.addEventListener("click", () => {
      currentIndex++;
      updateCarousel();
      setTimeout(jumpToEdge, 300);
    });
  
    prevButton.addEventListener("click", () => {
      currentIndex--;
      updateCarousel();
      setTimeout(jumpToEdge, 300);
    });
  
    // Configurar la posición inicial
    const initializeCarousel = () => {
      const width = items[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${(currentIndex + 1) * width}px)`;
    };
  
    initializeCarousel();
  
    // Asegura que el carrusel sea responsivo
    window.addEventListener("resize", initializeCarousel);
  });
  

  //BOTON COMPRA ENTRADAS
  document.querySelectorAll('.movie-card__button').forEach(button => {
    button.addEventListener('click', () => {
        alert('¡Vamos a por tus entradas!');
        // Aquí puedes redirigir con window.location.href = '/comprar-entradas.html';
    });
});






//CARRUSEL TOP PELICULAS

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".new-carousel__track");
    const prevButton = document.querySelector(".new-carousel__button--prev");
    const nextButton = document.querySelector(".new-carousel__button--next");
    const items = Array.from(track.children);
  
    let currentIndex = 0;
  
    const cloneItems = () => {
      const firstClone = items[0].cloneNode(true);
      const lastClone = items[items.length - 1].cloneNode(true);
  
      track.appendChild(firstClone);
      track.insertBefore(lastClone, items[0]);
    };
  
    cloneItems();
  
    const updateCarousel = () => {
      const width = items[0].getBoundingClientRect().width;
      track.style.transition = "transform 0.3s ease-in-out";
      track.style.transform = `translateX(-${(currentIndex + 1) * width}px)`;
    };
  
    const jumpToEdge = () => {
      const width = items[0].getBoundingClientRect().width;
      track.style.transition = "none";
      if (currentIndex === items.length) {
        currentIndex = 0;
        track.style.transform = `translateX(-${(currentIndex + 1) * width}px)`;
      } else if (currentIndex === -1) {
        currentIndex = items.length - 1;
        track.style.transform = `translateX(-${(currentIndex + 1) * width}px)`;
      }
    };
  
    nextButton.addEventListener("click", () => {
      currentIndex++;
      updateCarousel();
      setTimeout(jumpToEdge, 300);
    });
  
    prevButton.addEventListener("click", () => {
      currentIndex--;
      updateCarousel();
      setTimeout(jumpToEdge, 300);
    });
  
    // Configurar la posición inicial
    const initializeCarousel = () => {
      const width = items[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${(currentIndex + 1) * width}px)`;
    };
  
    initializeCarousel();
  
    // Asegura que el carrusel sea responsivo
    window.addEventListener("resize", initializeCarousel);
  });
  