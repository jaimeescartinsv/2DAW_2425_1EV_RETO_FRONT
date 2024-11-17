async function fetchMovies() {
    try {
        const response = await fetch('http://localhost:5000/api/peliculas');
        const movies = await response.json();
        console.log('Datos recibidos de la API:', movies);

        if (movies.length > 0) { // Verificar si hay películas disponibles
            const limitedMovies = movies.slice(0, 21); // Selecciona solo las primeras 6 películas
            displayCarousel(limitedMovies);
        } else {
            console.error('La respuesta de la API no contiene películas:', movies);
        }
    } catch (error) {
        console.error('Error al cargar las películas:', error);
    }
}

function displayCarousel(movies) {
    const carouselContent = document.getElementById('carouselContent');
    if (!carouselContent) {
        console.error('Contenedor del carrusel no encontrado.');
        return;
    }

    const isMobile = window.innerWidth <= 768; // Detectar vista móvil
    const chunkSize = isMobile ? 1 : 3; // 1 tarjeta por slide en móvil, 3 en pantallas mayores

    carouselContent.innerHTML = ''; // Limpiar contenido previo

    for (let i = 0; i < movies.length; i += chunkSize) {
        const chunk = movies.slice(i, i + chunkSize);
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (i === 0) {
            carouselItem.classList.add('active');
        }

        const row = document.createElement('div');
        row.classList.add('row', 'justify-content-center', 'align-items-stretch');

        chunk.forEach(movie => {
            const col = document.createElement('div');
            col.classList.add('col-md-4', 'd-flex');

            col.innerHTML = `
                <div class="card h-100">
                    <img src="${movie.imageUrl || 'https://via.placeholder.com/300x400'}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${movie.title || 'Título no disponible'}</h5>
                        <p class="card-text">${movie.description || 'Descripción no disponible.'}</p>
                        <p><strong>Duración:</strong> ${movie.duration || 'N/A'} minutos</p>
                        <a href="#" class="btn btn-primary mt-auto">Ver Más</a>
                    </div>
                </div>
            `;
            row.appendChild(col);
        });

        carouselItem.appendChild(row);
        carouselContent.appendChild(carouselItem);
    }
}

// Detectar cambio de tamaño de la ventana y actualizar el carrusel
window.addEventListener('resize', () => {
    fetchMovies();
});

// Inicializar el carrusel al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.navbar-toggler');
    const userNav = document.getElementById('userNav');

    toggleButton.addEventListener('click', () => {
        const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            userNav.innerHTML = `
                <a class="nav-link" href="#">
                    Mi usuario
                </a>
            `;
        } else {
            userNav.innerHTML = `
                <a class="nav-link" href="#">
                    <i class="bi bi-person-circle"></i>
                </a>
            `;
        }
    });
});