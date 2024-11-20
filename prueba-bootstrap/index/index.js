async function fetchPeliculas() {
    try {
        const response = await fetch('http://localhost:5000/api/peliculas');
        const peliculas = await response.json();
        console.log('Datos recibidos de la API:', peliculas);

        if (peliculas.length > 0) { // Verificar si hay películas disponibles
            const peliculasDestacadas = peliculas.slice(0, 6); // Selecciona solo las primeras 6 películas
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

    const isMobile = window.innerWidth <= 768; // Detectar vista móvil
    const chunkSize = isMobile ? 1 : 3; // 1 tarjeta por slide en móvil, 3 en pantallas mayores

    carouselContent.innerHTML = ''; // Limpiar contenido previo

    for (let i = 0; i < peliculas.length; i += chunkSize) {
        const chunk = peliculas.slice(i, i + chunkSize);
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (i === 0) {
            carouselItem.classList.add('active');
        }

        const row = document.createElement('div');
        row.classList.add('row', 'justify-content-center', 'align-items-stretch');

        chunk.forEach(pelicula => {
            const col = document.createElement('div');
            col.classList.add('col-md-4', 'd-flex');

            col.innerHTML = `
                <div class="card h-100">
                    <img src="${pelicula.imageUrl || 'https://via.placeholder.com/300x400'}" class="card-img-top" alt="${pelicula.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${pelicula.title || 'Título no disponible'}</h5>
                        <p class="card-text">${pelicula.description || 'Descripción no disponible.'}</p>
                        <p><strong>Duración:</strong> ${pelicula.duration || 'N/A'} minutos</p>
                        <button class="btn btn-primary mt-auto view-more-btn" data-pelicula-id="${pelicula.peliculaId}">Ver más</button>
                    </div>
                </div>
            `;
            row.appendChild(col);
        });

        carouselItem.appendChild(row);
        carouselContent.appendChild(carouselItem);
    }

    const viewMoreButtons = document.querySelectorAll('.view-more-btn');
    viewMoreButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const peliculaId = event.target.getAttribute('data-pelicula-id'); // Obtener el ID de la película
            localStorage.setItem('selectedPeliculaId', peliculaId); // Guardar el ID en localStorage
            window.location.href = '../pelicula/pelicula.html';
        });
    });
}


// Detectar cambio de tamaño de la ventana y actualizar el carrusel
window.addEventListener('resize', () => {
    fetchPeliculas();
});

// Inicializar el carrusel al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    fetchPeliculas();
});