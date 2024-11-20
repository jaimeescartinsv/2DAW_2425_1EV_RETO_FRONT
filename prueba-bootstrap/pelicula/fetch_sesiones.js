document.addEventListener("DOMContentLoaded", function () {
    const apiUrlSesiones = "http://localhost:5000/api/sesiones/cine";
    const peliculaId = localStorage.getItem("selectedPeliculaId");
    let cinesMap = {}; // Se actualiza desde el evento "cinesCargados"

    document.addEventListener("cinesCargados", function (event) {
        cinesMap = event.detail; // Actualizar el cinesMap
    });

    // Función para renderizar las sesiones
    function renderSesiones(sesiones, cineId) {
        const sesionesContainer = document.getElementById("sesionesContainer");
        const cineNombre = cinesMap[cineId]; // Obtener el nombre del cine desde el mapa

        if (!sesionesContainer) {
            console.error("No se encontró el contenedor para renderizar las sesiones.");
            return;
        }

        // Agrupar sesiones por fecha
        const groupedSesiones = sesiones.reduce((acc, sesion) => {
            const fecha = sesion.fechaDeSesion.split("T")[0]; // Obtener solo la fecha
            if (!acc[fecha]) acc[fecha] = [];
            acc[fecha].push(sesion);
            return acc;
        }, {});

        // Limpiar el contenedor
        sesionesContainer.innerHTML = '<h3 class="mb-3">Sesiones Disponibles</h3>';

        for (const [fecha, sesiones] of Object.entries(groupedSesiones)) {
            const DiaSection = document.createElement("div");
            DiaSection.classList.add("dia-section", "mb-4");

            const fechaHeader = document.createElement("h4");
            fechaHeader.classList.add("text-dark", "mb-3");
            fechaHeader.textContent = new Date(fecha).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
            DiaSection.appendChild(fechaHeader);

            sesiones.forEach(sesion => {
                const sesionCard = document.createElement("div");
                sesionCard.classList.add(
                    "sesion-card",
                    "d-flex",
                    "justify-content-between",
                    "align-items-center",
                    "p-3",
                    "mb-3",
                    "bg-light",
                    "text-dark",
                    "rounded"
                );

                sesionCard.innerHTML = `
                    <div>
                        <h5 class="mb-0 cine-nombre">${cineNombre}</h5>
                        <h5 class="mb-0">Hora: ${new Date(sesion.horaDeInicio).toLocaleTimeString("es-ES", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}</h5>
                        <h5 class="mb-0">Sala: ${sesion.salaId}</h5>
                    </div>
                    <div>
                        <button class="btn btn-primary w-100" onclick="comprarEntradas(${sesion.sesionId})">Comprar Entradas</button>
                    </div>
                `;
                DiaSection.appendChild(sesionCard);
            });

            sesionesContainer.appendChild(DiaSection);
        }
    }

    // Función para cargar las sesiones según el cine seleccionado
    function cargarSesiones(cineId) {
        const sesionesContainer = document.getElementById("sesionesContainer");

        sesionesContainer.innerHTML = '<p class="text-warning">Cargando sesiones...</p>';

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
                    renderSesiones(sesiones, cineId);
                } else {
                    sesionesContainer.innerHTML = '<p class="text-danger">No hay sesiones disponibles para este cine y película.</p>';
                }
            })
            .catch(error => {
                console.error("Error al obtener las sesiones:", error);
                sesionesContainer.innerHTML = '<p class="text-danger">Hubo un error al cargar las sesiones.</p>';
            });
    }

    // Event Listener para el cambio de cine
    document.getElementById("cineSelect").addEventListener("change", function () {
        const selectedCineId = this.value;

        if (selectedCineId) {
            cargarSesiones(selectedCineId);
            console.log(`Seleccionado cine con ID: ${selectedCineId}`)
        } else {
            const sesionesContainer = document.getElementById("sesionesContainer");
            sesionesContainer.innerHTML = '<p class="text-warning">Por favor, selecciona un cine para ver las sesiones.</p>';
        }
    });

    // Función para redirigir a la compra de entradas
    window.comprarEntradas = function (sesionId) {
        console.log(`Redirigiendo a la compra de entradas para la sesión ID: ${sesionId}`);
        //window.location.href = ``;
    };
});