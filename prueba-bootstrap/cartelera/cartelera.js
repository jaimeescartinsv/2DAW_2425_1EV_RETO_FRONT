document.addEventListener("DOMContentLoaded", function () {
    let allMovies = [];
    let filteredMovies = [];
    let moviesPerPage = 6;
    let currentPage = 1;
    let totalPages = 0;

    // Función para cargar todas las películas desde la API
    async function fetchMovies() {
        try {
            const response = await fetch("http://localhost:5000/api/peliculas");
            const movies = await response.json();
            console.log('Datos recibidos de la API:', movies);
            if (movies.length > 0) {
                allMovies = movies;
                filteredMovies = allMovies.slice();
                totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
                displayMoviesForPage(currentPage);
            } else {
                console.error("No hay películas disponibles en la API.");
                showMessage("No hay películas disponibles en este momento.");
            }
        } catch (error) {
            console.error("Error al cargar las películas:", error);
            showMessage("Error al cargar las películas. Por favor, intenta más tarde.");
        }
    }

    // Función para mostrar las películas en la cuadrícula
    function displayMovies(movies) {
        const movieGrid = document.getElementById("movieGrid");
        if (!movieGrid) {
            console.error("Contenedor de la cartelera no encontrado.");
            return;
        }

        movieGrid.innerHTML = "";

        if (movies.length === 0) {
            showMessage("No se encontraron películas.");
            return;
        }

        hideMessage();

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
        const genreInput = document.getElementById("searchByGenre").value;

        if (searchInput === "") {
            if (genreInput !== "") {
                searchMoviesByGenre();
            } else {
                filteredMovies = allMovies.slice();
                totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
                displayMoviesForPage(1);
            }
            return;
        }

        try {
            let filteredByGenre = allMovies.slice();
            if (genreInput !== "") {
                filteredByGenre = allMovies.filter(movie =>
                    movie.genero && movie.genero.toLowerCase().includes(genreInput.toLowerCase())
                );
            }

            filteredMovies = filteredByGenre.filter(movie =>
                movie.title && movie.title.toLowerCase().includes(searchInput.toLowerCase())
            );

            if (filteredMovies.length > 0) {
                totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
                displayMoviesForPage(1);
            } else {
                console.error("No se encontraron películas con ese título y categoría.");
                filteredMovies = [];
                totalPages = 0;
                displayMovies([]);
                updatePagination(totalPages, 1);
            }
        } catch (error) {
            console.error("Error al buscar películas por título:", error);
            showMessage("Error al buscar películas. Por favor, intenta más tarde.");
        }
    }

    // Función para buscar películas por género
    async function searchMoviesByGenre() {
        const genreInput = document.getElementById("searchByGenre").value;

        if (genreInput === "") {
            filteredMovies = allMovies.slice();
            totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
            displayMoviesForPage(1);
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/peliculas/buscar-por-género?genero=${encodeURIComponent(genreInput)}`
            );
            if (response.ok) {
                filteredMovies = await response.json();
                totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
                displayMoviesForPage(1);
            } else {
                console.error(`No se encontraron películas con el género: ${genreInput}.`);
                filteredMovies = [];
                totalPages = 0;
                displayMovies([]);
                updatePagination(totalPages, 1);
            }
        } catch (error) {
            console.error("Error al buscar películas por género:", error);
            showMessage("Error al buscar películas. Por favor, intenta más tarde.");
        }
    }

    // Función para mostrar el mensaje
    function showMessage(message) {
        const messageContainer = document.getElementById("messageContainer");
        if (messageContainer) {
            messageContainer.textContent = message;
            messageContainer.style.display = "block";
        }
    }

    // Función para ocultar el mensaje
    function hideMessage() {
        const messageContainer = document.getElementById("messageContainer");
        if (messageContainer) {
            messageContainer.style.display = "none";
        }
    }

    // Función para actualizar los botones de página
    function updatePagination(totalPages, currentPage) {
        const paginationContainer = document.getElementById("pagination");
        paginationContainer.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement("li");
            li.classList.add("page-item");

            if (i === currentPage) {
                li.classList.add("active");
            }

            const a = document.createElement("a");
            a.classList.add("page-link");
            a.href = "#";
            a.textContent = i;

            a.addEventListener("click", (e) => {
                e.preventDefault();
                displayMoviesForPage(i);
            });

            li.appendChild(a);
            paginationContainer.appendChild(li);
        }
    }

    // Función para manejar el cambio de página y actualizar películas
    function displayMoviesForPage(page) {
        currentPage = page;
        const startIndex = (page - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
        const moviesToShow = filteredMovies.slice(startIndex, endIndex);

        displayMovies(moviesToShow);
        updatePagination(totalPages, page);
    }

    // Función para guardar el ID de la película seleccionada en localStorage
    window.viewMovie = function (peliculaId) {
        localStorage.setItem("selectedPeliculaId", peliculaId);
    };

    fetchMovies();

    // Evento para buscar películas por título
    document.getElementById("searchByName").addEventListener("input", searchMoviesByTitle);

    // Evento para buscar películas por género
    document.getElementById("searchByGenre").addEventListener("change", searchMoviesByGenre);
});