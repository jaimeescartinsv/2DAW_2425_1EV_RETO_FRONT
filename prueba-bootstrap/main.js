// main.js
async function fetchMovies() {
    try {
        const response = await fetch('http://localhost:5000/api/peliculas'); // Cambia la URL según tu entorno
        const movies = await response.json();
        console.log('Datos recibidos de la API:', movies);

        if (Array.isArray(movies)) {
            displayCarousel(movies);
        } else {
            console.error('La respuesta de la API no es un array:', movies);
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

    const chunkSize = 3; // 3 películas por slide
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


// Inicializar el carrusel al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();
});