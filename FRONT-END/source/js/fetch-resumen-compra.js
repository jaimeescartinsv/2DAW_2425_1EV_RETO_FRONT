document.addEventListener("DOMContentLoaded", function () {
    const apiUrlPeliculas = "http://localhost:5000/api/peliculas";
    const apiUrlSesiones = "http://localhost:5000/api/sesiones";
    const apiUrlTickets = "http://localhost:5000/api/tickets";
    const emailCompra = localStorage.getItem("emailCompra");
    const ticketsContainer = document.getElementById("ticketsContainer");

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

        sessionDetailsElement.textContent = `Fecha: ${formattedDate} | Sala: ${sesion.salaId} | Hora: ${formattedTime}`;
    }

    // Renderizar tickets asociados al emailCompra
    function renderTickets(tickets) {
        if (tickets.length === 0) {
            ticketsContainer.innerHTML = "<p>No se encontraron tickets asociados a este email.</p>";
            return;
        }

        ticketsContainer.innerHTML = tickets.map(ticket => `
            <div class="ticket">
                <p><strong>Localizador:</strong> ${ticket.ticketId}</p>
                <p><strong>Sesión:</strong> ${ticket.sesionId}</p>
                <p><strong>Nombre:</strong> ${ticket.nombreInvitado}</p>
                <p><strong>Butaca:</strong> ${ticket.butacaId}</p>
                <p><strong>Fecha de Compra:</strong> ${new Date(ticket.fechaDeCompra).toLocaleString("es-ES")}</p>
            </div>
        `).join('');
    }

    // Renderizar precio total desde localStorage
    function renderPrecioTotal() {
        const precioTotal = localStorage.getItem("precioTotal");

        if (!precioTotal) {
            console.error("No se encontró 'precioTotal' en localStorage.");
            const precioContainer = document.createElement("p");
            precioContainer.textContent = "Precio total no disponible.";
            ticketsContainer.appendChild(precioContainer);
            return;
        }

        const precioContainer = document.createElement("div");
        precioContainer.classList.add("precio-total");
        precioContainer.textContent = `Precio total: €${parseFloat(precioTotal).toFixed(2)}`;
        ticketsContainer.appendChild(precioContainer);
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

    // Fetch para obtener los tickets asociados al emailCompra
    if (emailCompra) {
        fetch(`${apiUrlTickets}/emailCompra/${encodeURIComponent(emailCompra)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener los datos de los tickets.");
                }
                return response.json();
            })
            .then(tickets => {
                renderTickets(tickets);
                renderPrecioTotal();
            })
            .catch(error => {
                console.error("Error al cargar los datos de los tickets:", error);
                ticketsContainer.innerHTML = "<p>Hubo un error al cargar los tickets.</p>";
            });
    } else {
        console.error("No se encontró un emailCompra en localStorage.");
        ticketsContainer.innerHTML = "<p>No se pudo cargar la información de los tickets.</p>";
    }
});