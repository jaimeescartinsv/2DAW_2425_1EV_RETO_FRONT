document.addEventListener("DOMContentLoaded", function () {
    const apiUrlPeliculas = "http://localhost:5000/api/peliculas";

    // Renderizar los detalles de la película
    function renderMovieDetails(pelicula) {
        const movieTitle = document.querySelector('.resumen-compra__titulo');
        const movieImage = document.querySelector('.resumen-compra__imagen');

        if (!pelicula) {
            console.error("Datos de la película no disponibles.");
            return;
        }

        // Actualizar el título, imagen y detalles
        if (movieTitle) movieTitle.textContent = pelicula.title || "Título no disponible";
        if (movieImage) movieImage.src = pelicula.cartelUrl || "https://via.placeholder.com/300x450";
    }

    // Obtener el ID de la película desde localStorage
    const selectedPeliculaId = localStorage.getItem('selectedPeliculaId');

    if (!selectedPeliculaId) {
        console.error("No se encontró 'selectedPeliculaId' en localStorage.");
        return;
    }

    // Fetch para obtener los datos de la película
    fetch(`${apiUrlPeliculas}/${selectedPeliculaId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los datos de la película.");
            }
            return response.json();
        })
        .then(pelicula => {
            renderMovieDetails(pelicula);
        })
        .catch(error => {
            console.error("Error al cargar los datos de la película:", error);
        });
});