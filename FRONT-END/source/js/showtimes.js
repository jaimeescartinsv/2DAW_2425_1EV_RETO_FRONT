export async function fetchMovies() {
    try {
        const response = await fetch('http://localhost:5000/api/movies');
        const movies = await response.json();
        console.log('Respuesta de la API:', movies);
        
        if (Array.isArray(movies)) {
            displayMovies(movies);
        } else {
            console.error('La respuesta de la API no es un array:', movies);
        }
    } catch (error) {
        console.error('Error al cargar las películas:', error);
    }
}

export function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies');
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${movie.imageUrl}" alt="${movie.title}" class="movie-image">
            <div class="movie-details">
                <h3>${movie.title}</h3>
                <p>${movie.description}</p>
                <p><strong>Duración:</strong> ${movie.duration} minutos</p>  <!-- Duración añadida -->
                <button onclick="selectShowtime(${movie.id})">Seleccionar Función</button>
            </div>
        `;
        moviesContainer.appendChild(movieElement);
    });
}

export function goBackToMovies() {
    document.getElementById('movies').style.display = 'block';  // Volver a mostrar la lista de películas
    document.getElementById('seat-selection').style.display = 'none';  // Ocultar la selección de asientos
}

window.selectShowtime = (movieId) => {
    document.getElementById('movies').style.display = 'none';  // Ocultar lista de películas
    document.getElementById('seat-selection').style.display = 'block';  // Mostrar selección de asientos
    initSeatSelection(movieId);  // Llamada a la función de selección de asientos
};

function initSeatSelection(movieId) {
    // Lógica para manejar la selección de asientos
    console.log(`Seleccionando asientos para la película con ID: ${movieId}`);
    
    // Aquí podrías agregar más lógica para cargar los asientos disponibles y mostrarlos
}