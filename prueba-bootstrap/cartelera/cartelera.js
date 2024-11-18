document.addEventListener("DOMContentLoaded", function () {
    let allMovies = [];

    // Función para cargar todas las películas desde la API
    async function fetchMovies() {
        try {
            const response = await fetch("http://localhost:5000/api/peliculas");
            const movies = await response.json();
            console.log('Datos recibidos de la API:', movies);
            if (movies.length > 0) {
                allMovies = movies;
                displayMovies(movies);
            } else {
                console.error("No hay películas disponibles en la API.");
            }
        } catch (error) {
            console.error("Error al cargar las películas:", error);
        }
    }

    // Función para mostrar las películas en la cuadrícula
    function displayMovies(movies) {
        const movieGrid = document.getElementById("movieGrid");
        if (!movieGrid) {
            console.error("Contenedor de la cartelera no encontrado.");
            return;
        }

        movieGrid.innerHTML = ""; // Limpiar contenido previo

        movies.forEach((movie) => {
            const col = document.createElement("div");
            col.classList.add("col-md-4", "mb-4");

            col.innerHTML = `
                <div class="card movie-card h-100">
                    <img src="${movie.imageUrl || 'https://via.placeholder.com/300x400'}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title || "Título no disponible"}</h5>
                        <p class="card-text">${movie.description || "Sin descripción disponible."}</p>
                        <p class="card-text"><strong>Duración:</strong> ${movie.duration || "N/A"} minutos</p>
                        <a href="../pelicula/pelicula.html" class="btn btn-primary w-100" onclick="viewMovie(${movie.peliculaId})">Ver más</a>
                    </div>
                </div>
            `;
            movieGrid.appendChild(col);
        });
    }

    // Función para buscar películas por título
    async function searchMoviesByTitle() {
        const searchInput = document.getElementById("searchByName").value.trim();

        if (searchInput === "") {
            displayMovies(allMovies); // Mostrar todas las películas si el campo está vacío
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/peliculas/buscar-por-titulo?title=${encodeURIComponent(searchInput)}`);
            if (response.ok) {
                const filteredMovies = await response.json();
                displayMovies(filteredMovies);
            } else {
                console.error("No se encontraron películas con ese título.");
                displayMovies([]); // Mostrar cuadrícula vacía
            }
        } catch (error) {
            console.error("Error al buscar películas por título:", error);
        }
    }

    // Función para guardar el ID de la película seleccionada en localStorage
    window.viewMovie = function (peliculaId) {
        localStorage.setItem("selectedMovieId", peliculaId);
    };

    // Inicializar
    fetchMovies();

    // Evento para buscar películas por título
    document.getElementById("searchByName").addEventListener("input", searchMoviesByTitle);
});