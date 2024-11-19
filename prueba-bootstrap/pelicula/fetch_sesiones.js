document.addEventListener("DOMContentLoaded", function () {
    const apiUrlSesiones = "http://localhost:5000/api/sesiones/cine";
    const cineId = 1;
    
    // Función para renderizar las sesiones en el DOM
    function renderSesiones(sesiones) {
        const sessionsContainer = document.getElementById("sessionsContainer");

        if (!sessionsContainer) {
            console.error("No se encontró el contenedor para renderizar las sesiones.");
            return;
        }

        // Agrupar sesiones por fecha
        const groupedSessions = sesiones.reduce((acc, sesion) => {
            const fecha = sesion.fechaDeSesion.split("T")[0]; // Obtener solo la fecha
            if (!acc[fecha]) acc[fecha] = [];
            acc[fecha].push(sesion);
            return acc;
        }, {});

        // Limpiar el contenedor
        sessionsContainer.innerHTML = '<h3 class="mb-3">Sesiones Disponibles</h3>';

        // Crear los elementos dinámicos
        for (const [fecha, sesiones] of Object.entries(groupedSessions)) {
            const daySection = document.createElement("div");
            daySection.classList.add("day-section", "mb-4");

            // Encabezado con la fecha
            const dateHeader = document.createElement("h4");
            dateHeader.classList.add("text-dark", "mb-3");
            dateHeader.textContent = new Date(fecha).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
            daySection.appendChild(dateHeader);

            // Crear las tarjetas de sesiones
            sesiones.forEach(sesion => {
                const sessionCard = document.createElement("div");
                sessionCard.classList.add(
                    "session-card",
                    "d-flex",
                    "justify-content-between",
                    "align-items-center",
                    "p-3",
                    "mb-3",
                    "bg-light",
                    "text-dark",
                    "rounded"
                );

                sessionCard.innerHTML = `
                    <div>
                        <h5 class="mb-0">${new Date(sesion.horaDeInicio).toLocaleTimeString("es-ES", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}</h5>
                        <p class="mb-0">Sala: ${sesion.salaId}</p>
                    </div>
                    <span class="badge bg-primary">Sesión ID: ${sesion.sesionId}</span>
                `;
                daySection.appendChild(sessionCard);
            });

            // Agregar la sección al contenedor principal
            sessionsContainer.appendChild(daySection);
        }
    }

    // Obtener el ID de la película desde localStorage
    const peliculaId = localStorage.getItem("selectedMovieId");

    if (peliculaId) {
        // Realizar el fetch para obtener las sesiones
        fetch(`${apiUrlSesiones}/${cineId}/pelicula/${peliculaId}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error en la solicitud a la API.");
                }
            })
            .then(sesiones => {
                if (sesiones && sesiones.length > 0) {
                    renderSesiones(sesiones); // Renderizar las sesiones obtenidas
                } else {
                    console.error("No se encontraron sesiones para la película.");
                }
            })
            .catch(error => {
                console.error("Error al obtener las sesiones:", error);
            });
    } else {
        console.error("No se encontró ningún ID de película en localStorage.");
    }
});