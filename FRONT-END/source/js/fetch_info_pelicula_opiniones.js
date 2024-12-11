document.addEventListener("DOMContentLoaded", function () {
    const apiUrlOpiniones = "http://localhost:5000/api/opiniones";

    // Función para renderizar las opiniones de la película
    function renderOpiniones(opiniones) {
        const contenedorOpiniones = document.getElementById("contenedor__opiniones");
        opiniones.forEach((opinion) => {
            console.log(opinion)
            const movieOpiniones = document.createElement("div");
            
            movieOpiniones.innerHTML = `
                <h2 class="movie-card__title">${opinion.usuario || "Título no disponible"}</h2>
                <p class="movie-card__description">${opinion.comentario || "Sin descripción disponible."}</p>
                <p class="movie-card__duration">${opinion.estrellas || "N/A"} estrellas</p>
            `;
            console.log(movieOpiniones)
            console.log(contenedorOpiniones)

            contenedorOpiniones.appendChild(movieOpiniones);
        })
    }

    // Obtener el ID de la película desde localStorage y cargar los datos
    const selectedPeliculaId = localStorage.getItem('selectedPeliculaId');
    if (selectedPeliculaId) {
        fetch(`${apiUrlOpiniones}/${selectedPeliculaId}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error en la solicitud a la API.');
                }
            })
            .then(opinion => {
                if (opinion) {
                    renderOpiniones(opinion); // Renderizar la opinión
                    console.log(`Renderizado opinión de película con ID: ${selectedPeliculaId}`)
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


// Función para renderizar las opiniones de la película
function renderOpiniones(opiniones) {
    const movieOpiniones = document.querySelector('.movie__opiniones');

    opiniones.forEach((opinion) => {
        movieOpiniones.innerHTML = `<strong>Opiniones:</strong> ${opinion.comentario || 'No disponible.'}`
        movieOpiniones.appendChild()
    })
}