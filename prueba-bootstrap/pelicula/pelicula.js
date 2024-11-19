document.addEventListener("DOMContentLoaded", function () {
    const apiUrlCines = "http://localhost:5000/api/cines";
    const apiUrlPeliculas = "http://localhost:5000/api/peliculas";

    // Función para renderizar los datos de la película
    function renderPeliculas(pelicula) {
        const movieTitle = document.getElementById('movieTitle');
        const movieDuration = document.getElementById('movieDuration');
        const movieGenre = document.getElementById('movieGenre');
        const movieRating = document.getElementById('movieRating');
        const movieDescription = document.getElementById('movieDescription');
        const moviePoster = document.getElementById('moviePoster');
        const movieBanner = document.getElementById('movieBanner');
        const movieDirector = document.getElementById('movieDirector');
        const movieActors = document.getElementById('movieActors');

        if (movieTitle && movieDuration && movieGenre && movieRating && movieDescription && moviePoster && movieBanner && movieDirector && movieActors) {
            movieTitle.innerHTML = pelicula.title || 'Título no disponible';
            movieActors.innerHTML = pelicula.actores || 'No hay información disponible sobre los actores.';
            movieDuration.innerHTML = `${pelicula.duration || 'N/A'} minutos`;
            movieGenre.innerHTML = pelicula.genero || 'No especificado';
            movieRating.innerHTML = pelicula.clasificacion || 'Sin clasificar';
            movieDescription.innerHTML = pelicula.description || 'No disponible.';
            moviePoster.src = pelicula.imageUrl || 'https://via.placeholder.com/300x400';
            movieBanner.src = pelicula.cartelUrl || 'https://via.placeholder.com/1920x600';
            movieDirector.innerHTML = pelicula.director || 'Desconocido';
        } else {
            console.error("No se encontraron los elementos del DOM para renderizar la película.");
        }
    }

    // Función para renderizar el listado de cines
    function renderCines(cines) {
        const cinemaSelect = document.getElementById("cinemaSelect");
        const cinemaError = document.getElementById("cinemaError");

        if (cinemaSelect) {
            cinemaSelect.innerHTML = '<option value="" disabled selected>Selecciona un cine</option>';

            if (cines.length > 0) {
                cines.forEach(cine => {
                    const option = document.createElement("option");
                    option.value = cine.id;
                    option.textContent = cine.nombre;
                    cinemaSelect.appendChild(option);
                });
                cinemaError.style.display = "none";
            } else {
                cinemaError.textContent = "No hay cines disponibles.";
                cinemaError.style.display = "block";
            }
        } else {
            console.error("No se encontró el elemento 'cinemaSelect' en el DOM.");
        }
    }

    // Función para cargar listado de cines
    function cargarCines() {
        fetch(apiUrlCines)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al cargar el listado de cines.');
                }
            })
            .then(cines => {
                renderCines(cines);
            })
            .catch(error => {
                console.error("Error al obtener los cines desde la API:", error);
            });
    }

    // Obtener listado de cines al cargar la página
    cargarCines();

    // Obtener el ID de la película desde localStorage
    const selectedMovieId = localStorage.getItem('selectedMovieId');
    if (selectedMovieId) {
        fetch(`${apiUrlPeliculas}/${selectedMovieId}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error en la solicitud a la API.');
                }
            })
            .then(pelicula => {
                if (pelicula) {
                    renderPeliculas(pelicula); // Renderizar la película seleccionada
                } else {
                    console.error("Película no encontrada en la API.");
                }
            })
            .catch(error => {
                console.error("Error al obtener los datos de la película:", error);
            });
    } else {
        console.error("No se encontró ningún ID de película en localStorage.");
    }
});