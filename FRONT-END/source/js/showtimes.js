export async function fetchMovies() {
    try {
        const response = await fetch('http://localhost:5000/api/movies');
        return await response.json();
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
            <h3>${movie.title}</h3>
            <p>${movie.description}</p>
            <button onclick="selectShowtime(${movie.id})">Seleccionar Función</button>
        `;
        moviesContainer.appendChild(movieElement);
    });
}

window.selectShowtime = (movieId) => {
    document.getElementById('movies').style.display = 'none';
    document.getElementById('seat-selection').style.display = 'block';
    initSeatSelection(movieId);  // Llamada a initSeatSelection con el ID de la película
};

function initSeatSelection(movieId) {
    // Lógica para manejar la selección de asientos
    console.log(`Seleccionando asientos para la película con ID: ${movieId}`);
}