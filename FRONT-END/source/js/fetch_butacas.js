document.addEventListener("DOMContentLoaded", function () {
    const apiUrlPeliculas = "http://localhost:5000/api/peliculas";
    const apiUrlSesiones = "http://localhost:5000/api/sesiones";

    // Renderizar título y banner de la película
    function renderBannerAndTitle(pelicula) {
        const movieTitle = document.getElementById('movieTitle');
        const movieBanner = document.querySelector('.movie-banner img');

        if (movieTitle && movieBanner) {
            movieTitle.textContent = pelicula.title || 'Título no disponible';
            movieBanner.src = pelicula.cartelUrl || 'https://via.placeholder.com/1920x600';
        } else {
            console.error("No se encontraron los elementos del DOM para renderizar el banner y el título.");
        }
    }

    // Mostrar los detalles de la sesión
    function renderSesionDetails(sesion) {
        const sessionDetailsElement = document.getElementById('sessionDetails');

        if (!sesion) {
            sessionDetailsElement.textContent = "No se pudieron cargar los detalles de la sesión.";
            return;
        }

        // Formatear la fecha y la hora
        const formattedDate = new Date(sesion.fechaDeSesion).toLocaleDateString("es-ES", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        const formattedTime = new Date(sesion.horaDeInicio).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
        });

        // Renderizar los detalles
        sessionDetailsElement.textContent = `Fecha: ${formattedDate} | Sala: ${sesion.salaId} | Hora: ${formattedTime}`;
    }

    // Renderizar las butacas con diseño personalizado
    function renderButacas(sesion) {
        const butacasContainer = document.querySelector('.seating-chart');
        butacasContainer.innerHTML = ""; // Limpiar el contenedor
    
        const rows = 12; // Número de filas
        const cols = 17; // Número de columnas
        const pasillosVerticales = [5, 11]; // Columnas de los pasillos verticales
        const pasillosHorizontales = [5, 10]; // Filas de los pasillos horizontales
    
        let butacaIndex = 0; // Índice de la butaca
    
        for (let row = 0; row < rows; row++) {
            // Comprobar si esta fila es un pasillo horizontal
            if (pasillosHorizontales.includes(row)) {
                const pasilloHorizontal = document.createElement('div');
                pasilloHorizontal.classList.add('pasillo-horizontal');
                butacasContainer.appendChild(pasilloHorizontal);
                continue; // Pasar a la siguiente fila
            }
    
            const rowContainer = document.createElement('div');
            rowContainer.classList.add('row');
    
            for (let col = 0; col < cols; col++) {
                // Espacio para pasillos verticales
                if (pasillosVerticales.includes(col)) {
                    const pasilloVertical = document.createElement('div');
                    pasilloVertical.classList.add('pasillo-vertical');
                    rowContainer.appendChild(pasilloVertical);
                    continue;
                }
    
                // Crear butaca
                const butaca = sesion.butacas[butacaIndex];
                if (!butaca) continue;
    
                const button = document.createElement('button');
                button.classList.add('seat');
                button.dataset.butacaId = butaca.butacaId;
    
                if (butaca.estado === "Disponible") {
                    button.classList.add('btn-outline-secondary');
                } else {
                    button.classList.add('btn-danger');
                    button.disabled = true;
                }
    
                rowContainer.appendChild(button);
                butacaIndex++;
            }
    
            butacasContainer.appendChild(rowContainer);
        }
    
        handleSeatSelection();
    }

    // Función para manejar la selección de butacas
    function handleSeatSelection() {
        const selectedSeatsText = document.getElementById('selectedSeats');
        const continueButton = document.getElementById('continue-btn'); // Botón de continuar
        const seats = document.querySelectorAll('.seat');
    
        seats.forEach(seat => {
            seat.addEventListener('click', () => {
                seat.classList.toggle('btn-success');
                seat.classList.toggle('btn-outline-secondary');
    
                updateSelectedSeats();
            });
        });
    
        function updateSelectedSeats() {
            const selectedSeats = Array.from(seats)
                .filter(seat => seat.classList.contains('btn-success'))
                .map(seat => `B${seat.dataset.butacaId}`);
    
            // Actualizar texto con las butacas seleccionadas
            selectedSeatsText.textContent = `Butacas seleccionadas: ${selectedSeats.length ? selectedSeats.join(', ') : 'Ninguna'}`;
    
            // Mostrar u ocultar el botón de continuar
            if (selectedSeats.length > 0) {
                continueButton.style.display = 'block'; // Mostrar el botón
            } else {
                continueButton.style.display = 'none'; // Ocultar el botón
            }
        }
    }

    // Obtener los IDs de película y sesión desde localStorage
    const selectedPeliculaId = localStorage.getItem('selectedPeliculaId');
    const selectedSesionId = localStorage.getItem('selectedSesionId');

    if (!selectedSesionId) {
        console.error("No se encontró ningún ID de sesión en localStorage.");
        document.getElementById('sessionDetails').textContent = "No se pudieron cargar los detalles de la sesión.";
        return;
    }

    if (!selectedPeliculaId) {
        console.error("No se encontró ningún ID de película en localStorage.");
        return;
    }

    // Fetch detalles de la sesión
    fetch(`${apiUrlSesiones}/${selectedSesionId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los datos de la sesión.");
            }
            return response.json();
        })
        .then(sesion => {
            renderSesionDetails(sesion);
            renderButacas(sesion);
        })
        .catch(error => {
            console.error("Error al cargar los datos de la sesión:", error);
            document.getElementById('sessionDetails').textContent = "Hubo un error al cargar los detalles de la sesión.";
        });

    // Fetch para cargar y renderizar el título y el banner de la película
    fetch(`${apiUrlPeliculas}/${selectedPeliculaId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud a la API.');
            }
            return response.json();
        })
        .then(pelicula => {
            if (pelicula) {
                renderBannerAndTitle(pelicula);
            } else {
                console.error("Película no encontrada en la API.");
            }
        })
        .catch(error => {
            console.error("Error al obtener los datos de la película:", error);
        });
});