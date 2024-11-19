document.addEventListener("DOMContentLoaded", function () {
    const apiUrlCines = "http://localhost:5000/api/cines";
    const apiUrlSesiones = "http://localhost:5000/api/sesiones/cine";
    const peliculaId = localStorage.getItem("selectedMovieId");

    // Función para renderizar el listado de cines
    function renderCines(cines) {
        const cinemaSelect = document.getElementById("cinemaSelect");
        const cinemaError = document.getElementById("cinemaError");

        if (cinemaSelect) {
            cinemaSelect.innerHTML = '<option value="" selected>Selecciona un cine</option>';

            if (cines.length > 0) {
                cines.forEach(cine => {
                    const option = document.createElement("option");
                    option.value = cine.cineId;
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

    // Función para cargar el listado de cines
    function cargarCines() {
        fetch(apiUrlCines)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error al cargar el listado de cines.");
                }
            })
            .then(cines => {
                renderCines(cines);
            })
            .catch(error => {
                console.error("Error al obtener los cines desde la API:", error);
            });
    }

    // Función para renderizar las sesiones
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

        for (const [fecha, sesiones] of Object.entries(groupedSessions)) {
            const daySection = document.createElement("div");
            daySection.classList.add("day-section", "mb-4");

            const dateHeader = document.createElement("h4");
            dateHeader.classList.add("text-dark", "mb-3");
            dateHeader.textContent = new Date(fecha).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
            daySection.appendChild(dateHeader);

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

            sessionsContainer.appendChild(daySection);
        }
    }

    // Función para cargar las sesiones según el cine seleccionado
    function cargarSesiones(cineId) {
        const sessionsContainer = document.getElementById("sessionsContainer");

        // Limpiar el contenedor de sesiones
        sessionsContainer.innerHTML = "";

        if (!peliculaId) {
            console.error("No se encontró ningún ID de película en localStorage.");
            return;
        }

        fetch(`${apiUrlSesiones}/${cineId}/pelicula/${peliculaId}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error en la solicitud de sesiones.");
                }
            })
            .then(sesiones => {
                if (sesiones && sesiones.length > 0) {
                    renderSesiones(sesiones);
                } else {
                    sessionsContainer.innerHTML = '<p class="text-danger">No hay sesiones disponibles para este cine y película.</p>';
                }
            })
            .catch(error => {
                console.error("Error al obtener las sesiones:", error);
            });
    }

    // Event Listener para el cambio de cine
    document.getElementById("cinemaSelect").addEventListener("change", function () {
        const selectedCineId = this.value;

        if (selectedCineId) {
            cargarSesiones(selectedCineId);
        } else {
            const sessionsContainer = document.getElementById("sessionsContainer");
            sessionsContainer.innerHTML = '<p class="text-warning">Por favor, selecciona un cine para ver las sesiones.</p>';
        }
    });

    // Inicializar la carga de cines
    cargarCines();
});