document.addEventListener("DOMContentLoaded", function () {
    let allMovies = [];
    let moviesPerPage = 6; // Número de películas por página
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
                totalPages = Math.ceil(allMovies.length / moviesPerPage);
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

        movieGrid.innerHTML = ""; // Limpiar contenido previo

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

        if (searchInput === "") {
            totalPages = Math.ceil(allMovies.length / moviesPerPage);
            displayMoviesForPage(1); // Mostrar todas las películas si el campo está vacío
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/peliculas/buscar-por-titulo?title=${encodeURIComponent(searchInput)}`);
            if (response.ok) {
                const filteredMovies = await response.json();
                displayMovies(filteredMovies);
                totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
                updatePagination(totalPages, 1);
            } else {
                console.error("No se encontraron películas con ese título.");
                displayMovies([]);
                totalPages = 0;
                updatePagination(totalPages, 1);
            }
        } catch (error) {
            console.error("Error al buscar películas por título:", error);
            showMessage("Error al buscar películas. Por favor, intenta más tarde.");
        }
    }

    // Función para mostrar un mensaje
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

    // Función para actualizar los botones de paginación
    function updatePagination(totalPages, currentPage) {
        const paginationContainer = document.getElementById("pagination");
        paginationContainer.innerHTML = ""; // Limpiar contenido previo

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement("li");
            li.classList.add("page-item");

            // Resaltar la página activa
            if (i === currentPage) {
                li.classList.add("active");
            }

            const a = document.createElement("a");
            a.classList.add("page-link");
            a.href = "#";
            a.textContent = i;

            a.addEventListener("click", (e) => {
                e.preventDefault();
                displayMoviesForPage(i); // Mostrar películas de la página seleccionada
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
        const moviesToShow = allMovies.slice(startIndex, endIndex);

        displayMovies(moviesToShow);
        updatePagination(totalPages, page); // Actualizar botones de paginación con la página actual resaltada
    }

    // Función para guardar el ID de la película seleccionada en localStorage
    window.viewMovie = function (peliculaId) {
        localStorage.setItem("selectedMovieId", peliculaId);
    };

    fetchMovies();

    document.getElementById("searchByName").addEventListener("input", searchMoviesByTitle);
});