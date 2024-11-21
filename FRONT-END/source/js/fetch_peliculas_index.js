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

    // Crear duplicados al principio y al final
    const duplicatedPeliculas = [...peliculas, ...peliculas, ...peliculas];

    duplicatedPeliculas.forEach((pelicula, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('carousel__item');
        listItem.dataset.index = index;

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

    // Ajustar el `track` para comenzar en la primera copia "real"
    const offset = -peliculas.length * 100; // Posicionar en la primera iteración real
    carouselContent.style.transform = `translateX(${offset}%)`;

    currentIndex = peliculas.length; // Configurar el índice inicial
    trackSize = peliculas.length; // Guardar el tamaño real
}

let currentIndex = 0;
let trackSize = 0;

function updateCarouselPosition(index) {
    const carouselContent = document.querySelector('.carousel__track');
    const totalItems = document.querySelectorAll('.carousel__item').length;

    currentIndex = index;

    // Detectar si estamos en el límite izquierdo o derecho del bucle
    if (index < 0) {
        currentIndex = trackSize - 1; // Salto al final de la sección real
        carouselContent.style.transition = 'none'; // Desactivar transición para el salto
        const offset = -currentIndex * 100;
        carouselContent.style.transform = `translateX(${offset}%)`;

        // Rehabilitar la transición para el próximo movimiento
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                carouselContent.style.transition = 'transform 0.5s ease-in-out';
                updateCarouselPosition(currentIndex - 1);
            });
        });
        return;
    } else if (index >= trackSize * 2) {
        currentIndex = trackSize; // Salto al inicio de la sección real
        carouselContent.style.transition = 'none'; // Desactivar transición para el salto
        const offset = -currentIndex * 100;
        carouselContent.style.transform = `translateX(${offset}%)`;

        // Rehabilitar la transición para el próximo movimiento
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                carouselContent.style.transition = 'transform 0.5s ease-in-out';
                updateCarouselPosition(currentIndex + 1);
            });
        });
        return;
    }

    // Mover al nuevo índice
    const offset = -currentIndex * 100;
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