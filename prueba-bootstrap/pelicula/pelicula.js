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
        const movieDirector = document.getElementById('movieDirector'); // Agregar el campo de director

        // Verifica si los elementos existen antes de intentar modificarlos
        if (movieTitle && movieDuration && movieGenre && movieRating && movieDescription && moviePoster && movieBanner && movieDirector) {
            movieTitle.innerHTML = pelicula.title;  // `title` en lugar de `movieTitle`
            movieDuration.innerHTML = `${pelicula.duration} minutos`; // `duration`
            movieGenre.innerHTML = pelicula.genero; // `genero`
            movieRating.innerHTML = pelicula.clasificacion; // `clasificacion`
            movieDescription.innerHTML = pelicula.description;  // `description`
            moviePoster.src = pelicula.imageUrl;  // `imageUrl`
            movieBanner.src = pelicula.cartelUrl;  // `cartelUrl`
            movieDirector.innerHTML = pelicula.director; // Asignar el valor del director
        } else {
            console.error("No se encontraron los elementos del DOM.");
        }
    }

    // Función para obtener el ID de la película manualmente (por ejemplo, "1")
    function getMovieId() {
        return "3"; // Aquí puedes cambiar el ID manualmente según lo que necesites
    }

    // Función para obtener los detalles de la película desde un API o base de datos
    function fetchPeliculas() {
        const movieId = getMovieId(); // Obtiene el ID manualmente
        
        if (!movieId) {
            console.error("No se proporcionó un ID de película.");
            return;
        }

        // Hacer la solicitud fetch para obtener los datos de la película desde el endpoint de tu API
        fetch(`http://localhost:5000/api/peliculas/${movieId}`, {
            method: 'GET',
            headers: {
                'Accept': 'text/plain' // Incluye el encabezado Accept correcto
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Convierte la respuesta a JSON si es válida
            } else {
                throw new Error('Error en la solicitud');
            }
        })
        .then(pelicula => {
            if (pelicula) {
                // Llamar a renderPeliculas para actualizar el DOM con los datos de la película
                renderPeliculas(pelicula);
            } else {
                console.error("Película no encontrada.");
            }
        })
        .catch(error => {
            console.error("Error al obtener los datos de la película:", error);
        });
    }

    // Llamar a la función para cargar los detalles de la película
    fetchPeliculas();

    // Lógica para el botón de compra de entradas
    const btnPurchaseTickets = document.getElementById('btnPurchaseTickets');
    if (btnPurchaseTickets) {
        btnPurchaseTickets.addEventListener('click', () => {
            alert(`¡Entradas para "${document.getElementById('movieTitle').innerHTML}" seleccionadas!`);
        });
    }
});