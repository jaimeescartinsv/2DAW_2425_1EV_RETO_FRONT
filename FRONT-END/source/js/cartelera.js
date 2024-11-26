// Función para activar/desactivar el menú hamburguesa
document.querySelector('.header__menu-toggle').addEventListener('click', function () {
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

//BOTON COMPRA ENTRADAS
document.querySelectorAll('.movie-card__button').forEach(button => {
  button.addEventListener('click', () => {
    alert('¡Vamos a por tus entradas!');
    // Aquí puedes redirigir con window.location.href = '/comprar-entradas.html';
  });
});



//CARTELERA

document.addEventListener('DOMContentLoaded', () => {
  const movieCards = document.querySelectorAll('.movie-card');

  const filterMovies = (title = '', genre = '') => {
    movieCards.forEach(card => {
      const cardTitle = card.getAttribute('data-title').toLowerCase();
      const cardGenre = card.getAttribute('data-genre').toLowerCase();

      if (
        cardTitle.includes(title.toLowerCase()) &&
        cardGenre.includes(genre.toLowerCase())
      ) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  };

  // Simulación de cómo se filtrarían por entrada en algún filtro (conéctalo según necesidad)
  // Por ejemplo, puedes usar: filterMovies('origen', 'ciencia ficción');
});


//PAGINACION
document.addEventListener('DOMContentLoaded', () => {
  const moviesPerPage = 3; // Cantidad de películas por página
  const movieContainer = document.getElementById('movie-container');
  const pagination = document.getElementById('pagination');
  const movies = Array.from(movieContainer.children); // Todas las tarjetas de películas

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  // Función para renderizar las películas de la página actual
  const renderMovies = (page) => {
    // Oculta todas las películas
    movies.forEach((movie) => {
      movie.style.display = 'none';
    });

    // Muestra solo las películas correspondientes a la página actual
    const startIndex = (page - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    movies.slice(startIndex, endIndex).forEach((movie) => {
      movie.style.display = 'block';
    });
  };

  // Función para renderizar los controles de la paginación
  const renderPagination = () => {
    pagination.innerHTML = ''; // Limpia los controles existentes

    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement('button');
      pageItem.textContent = i;
      pageItem.classList.add('pagination__item');
      if (i === 1) pageItem.classList.add('pagination__item--active'); // Marca la primera página como activa

      pageItem.addEventListener('click', () => {
        // Actualiza la paginación
        document.querySelectorAll('.pagination__item').forEach((item) => {
          item.classList.remove('pagination__item--active');
        });
        pageItem.classList.add('pagination__item--active');

        // Renderiza las películas de la página seleccionada
        renderMovies(i);
      });

      pagination.appendChild(pageItem);
    }
  };

  // Inicializa la primera página y los controles de paginación
  renderMovies(1);
  renderPagination();
});






//buscador
document.addEventListener('DOMContentLoaded', () => {
  const searchTitle = document.getElementById('search-title');
  const searchGenre = document.getElementById('search-genre');
  const movieCards = document.querySelectorAll('.movie-card');

  const filterMovies = () => {
    const titleValue = searchTitle.value.toLowerCase().trim();
    const genreValue = searchGenre.value.toLowerCase().trim();

    movieCards.forEach((card) => {
      const cardTitle = card.getAttribute('data-title') || '';
      const cardGenre = card.getAttribute('data-genre') || '';

      const titleMatch = cardTitle.toLowerCase().includes(titleValue);
      const genreMatch = genreValue === '' || cardGenre.toLowerCase() === genreValue;

      if (titleMatch && genreMatch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  };

  searchTitle.addEventListener('input', filterMovies);
  searchGenre.addEventListener('change', filterMovies);
});