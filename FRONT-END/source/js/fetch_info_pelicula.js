document.addEventListener("DOMContentLoaded", function () {
    const apiUrlPeliculas = "http://35.173.111.3:5000/api/peliculas";

    // Función para renderizar los datos de la película
    function renderPeliculas(pelicula) {
        const movieTitle = document.querySelector('.movie__title');
        const movieDuration = document.querySelector('.movie__duration');
        const movieGenre = document.querySelector('.movie__genre');
        const movieRating = document.querySelector('.movie__rating');
        const movieSynopsis = document.querySelector('.movie__synopsis');
        const moviePoster = document.querySelector('.movie__poster');
        const movieBanner = document.querySelector('.movie__banner-image');
        const movieDirector = document.querySelector('.movie__director');
        const movieActors = document.querySelector('.movie__actors');

        if (movieTitle && movieDuration && movieGenre && movieRating && movieSynopsis && moviePoster && movieBanner && movieDirector && movieActors) {
            movieTitle.textContent = pelicula.title || 'Título no disponible';
            movieActors.innerHTML = `<strong>Actores:</strong> ${pelicula.actores || 'No hay información disponible sobre los actores.'}`;
            movieDuration.innerHTML = `<strong>Duración:</strong> ${pelicula.duration || 'N/A'} minutos`;
            movieGenre.innerHTML = `<strong>Género:</strong> ${pelicula.genero || 'No especificado'}`;
            movieRating.innerHTML = `<strong>Clasificación:</strong> ${pelicula.clasificacion || 'Sin clasificar'}`;
            movieSynopsis.innerHTML = `<strong>Sinopsis:</strong> ${pelicula.description || 'No disponible.'}`;
            moviePoster.src = pelicula.imageUrl || 'https://via.placeholder.com/300x400';
            movieBanner.src = pelicula.cartelUrl || 'https://via.placeholder.com/1920x600';
            movieDirector.innerHTML = `<strong>Director:</strong> ${pelicula.director || 'Desconocido'}`;
        } else {
            console.error("No se encontraron los elementos del DOM para renderizar la película.");
        }
    }

    // Obtener el ID de la película desde localStorage y cargar los datos
    const selectedPeliculaId = localStorage.getItem('selectedPeliculaId');
    if (selectedPeliculaId) {
        fetch(`${apiUrlPeliculas}/${selectedPeliculaId}`)
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
                    console.log(`Renderizado película con ID: ${selectedPeliculaId}`)
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