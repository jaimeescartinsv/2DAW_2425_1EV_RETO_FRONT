async function fetchPeliculas() {
  try {
    const response = await fetch("http://35.173.111.3:5000/api/peliculas");
    const peliculas = await response.json();

    if (peliculas.length > 0) {
      const peliculasDestacadas = peliculas.slice(0, 9); // Seleccionamos suficientes películas para mostrar
      displayCarousel(peliculasDestacadas);
    } else {
      console.error("La API no contiene películas:", peliculas);
    }
  } catch (error) {
    console.error("Error al cargar las películas:", error);
  }
}

function displayCarousel(peliculas) {
  const carouselContent = document.querySelector(".carousel__track");
  if (!carouselContent) {
    console.error("Contenedor del carrusel no encontrado.");
    return;
  }

  carouselContent.innerHTML = ""; // Limpiamos contenido anterior

  peliculas.forEach((pelicula) => {
    const listItem = document.createElement("li");
    listItem.classList.add("carousel__item");

    listItem.innerHTML = `
      <article class="movie-card">
        <h2 class="movie-card__title">${pelicula.title || "Sin título"}</h2>
        <img src="${pelicula.imageUrl || '/FRONT-END/source/images/placeholder-image.png'}" 
             alt="${pelicula.title}" 
             class="movie-card__image" />
        <button class="movie-card__button" data-id="${pelicula.peliculaId}">
          ¡Compra tus entradas!
        </button>
      </article>
    `;
    carouselContent.appendChild(listItem);
  });

  // Añadir eventos para almacenar el ID en localStorage y redirigir
  document.querySelectorAll('.movie-card__button').forEach(button => {
    button.addEventListener('click', (e) => {
      const movieId = e.currentTarget.getAttribute('data-id');
      if (movieId) {
        localStorage.setItem('selectedPeliculaId', movieId);
        console.log(`ID de la película almacenado en localStorage: ${movieId}`);
        window.location.href = 'peli-info.html'; // Redirigir a la página sin incluir el ID en la URL
      } else {
        console.error('No se encontró un ID válido para la película.');
      }
    });
  });

  initializeCarousel(); // Inicializamos el carrusel
}

function initializeCarousel() {
  const track = document.querySelector(".carousel__track");
  const items = Array.from(track.children);
  const prevButton = document.querySelector(".carousel__button--prev");
  const nextButton = document.querySelector(".carousel__button--next");

  let currentIndex = 0;

  const updateCarousel = () => {
    const itemWidth = items[0].offsetWidth;
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  };

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < items.length - 3) { // Controlamos que no avance más allá del último grupo
      currentIndex++;
      updateCarousel();
    }
  });

  window.addEventListener("resize", updateCarousel);
  updateCarousel(); // Posicionamos correctamente al cargar
}

// Llamamos a la función al cargar la página
document.addEventListener("DOMContentLoaded", fetchPeliculas);