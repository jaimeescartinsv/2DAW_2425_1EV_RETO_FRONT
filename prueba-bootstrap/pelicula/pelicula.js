document.addEventListener("DOMContentLoaded", function () {
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

        if (movieTitle && movieDuration && movieGenre && movieRating && movieDescription && moviePoster && movieBanner && movieDirector) {
            movieTitle.innerHTML = pelicula.title;
            movieDuration.innerHTML = `${pelicula.duration} minutos`;
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

    // Obtener el ID de la película desde localStorage
    const selectedMovieId = localStorage.getItem('selectedMovieId');
    if (selectedMovieId) {
        // Hacer una solicitud para obtener los datos de la película
        fetch(`http://localhost:5000/api/peliculas/${selectedMovieId}`)
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

    // Lógica para el botón de compra de entradas
    const btnPurchaseTickets = document.getElementById('btnPurchaseTickets');
    if (btnPurchaseTickets) {
        btnPurchaseTickets.addEventListener('click', () => {
            const movieTitle = document.getElementById('movieTitle').innerHTML;
            alert(`¡Entradas para "${movieTitle}" seleccionadas!`);
        });
    }
});