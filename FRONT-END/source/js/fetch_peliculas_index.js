async function fetchPeliculas() {
    try {
        const response = await fetch('http://localhost:5000/api/peliculas');
        const peliculas = await response.json();
        console.log('Datos recibidos de la API:', peliculas);

        if (peliculas.length > 0) {
            const peliculasDestacadas = peliculas.slice(0, 6);
            displayCarousel(peliculasDestacadas);
        } else {
            console.error('La respuesta de la API no contiene películas:', peliculas);
        }
    } catch (error) {
        console.error('Error al cargar las películas:', error);
    }
}

function displayCarousel(peliculas) {
    const carouselContent = document.getElementById('carouselContent');
    if (!carouselContent) {
        console.error('Contenedor del carrusel no encontrado.');
        return;
    }

    carouselContent.innerHTML = '';

    peliculas.forEach((pelicula, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('carousel__item');
        listItem.dataset.index = index; // Agregar un índice para facilitar el seguimiento

        listItem.innerHTML = `
            <article class="movie-card">
                <h2 class="movie-card__title">${pelicula.title || 'Título no disponible'}</h2>
                <img src="${pelicula.imageUrl || '/FRONT-END/source/images/placeholder-image.png'}" 
                     alt="${pelicula.title}" 
                     class="movie-card__image" />
                <button class="movie-card__button" onclick="location.href='/comprar-entradas.html';">
                    ¡Compra tus entradas!
                </button>
            </article>
        `;

        carouselContent.appendChild(listItem);
    });

    updateCarouselPosition(0); // Inicializar la posición
}

let currentIndex = 0; // Índice de la película actualmente visible

function updateCarouselPosition(index) {
    const carouselContent = document.querySelector('.carousel__track');
    const items = document.querySelectorAll('.carousel__item');
    const totalItems = items.length;

    if (index < 0) {
        currentIndex = totalItems - 1; // Volver al final si se retrocede desde el inicio
    } else if (index >= totalItems) {
        currentIndex = 0; // Volver al inicio si se avanza desde el final
    } else {
        currentIndex = index;
    }

    const offset = -currentIndex * 100; // Desplazar el `track` en función del índice
    carouselContent.style.transform = `translateX(${offset}%)`;
}

// Eventos para los botones de navegación
document.querySelector('.carousel__button--prev').addEventListener('click', () => {
    updateCarouselPosition(currentIndex - 1);
});

document.querySelector('.carousel__button--next').addEventListener('click', () => {
    updateCarouselPosition(currentIndex + 1);
});

// Inicializar el carrusel al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    fetchPeliculas();
});