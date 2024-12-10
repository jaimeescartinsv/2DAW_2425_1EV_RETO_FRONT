document.addEventListener("DOMContentLoaded", function () {
    let todasLasPeliculas = [];
    let peliculasFiltradas = [];
    let peliculasPorPagina = 6;
    let paginaActual = 1;
    let totalPaginas = 0;

    // Función cargar todas las películas desde la API
    async function cargarPeliculas() {
        try {
            const response = await fetch("http://localhost:5000/api/peliculas");
            const peliculas = await response.json();
            if (peliculas.length > 0) {
                todasLasPeliculas = peliculas;
                peliculasFiltradas = todasLasPeliculas.slice();
                totalPaginas = Math.ceil(peliculasFiltradas.length / peliculasPorPagina);
                mostrarPeliculasPorPagina(paginaActual);
            } else {
                mostrarMensaje("No hay películas disponibles en este momento.");
            }
        } catch (error) {
            console.error("Error al cargar las películas:", error);
            mostrarMensaje("Error al cargar las películas. Por favor, intenta más tarde.");
        }
    }

    // Función mostrar las películas en la cuadrícula
    function mostrarPeliculas(peliculas) {
        const contenedorPeliculas = document.getElementById("movie-container");
        if (!contenedorPeliculas) {
            console.error("Contenedor de películas no encontrado.");
            return;
        }

        contenedorPeliculas.innerHTML = "";

        if (peliculas.length === 0) {
            mostrarMensaje("No se encontraron películas.");
            return;
        }

        ocultarMensaje();

        peliculas.forEach((pelicula) => {
            const card = document.createElement("article");
            card.classList.add("movie-card");

            card.innerHTML = `
                <img class="movie-card__image" src="${pelicula.imageUrl || 'https://via.placeholder.com/300x400'}" alt="${pelicula.title}">
                <h2 class="movie-card__title">${pelicula.title || "Título no disponible"}</h2>
                <p class="movie-card__description">${pelicula.description || "Sin descripción disponible."}</p>
                <p class="movie-card__duration"><strong>Duración:</strong> ${pelicula.duration || "N/A"} minutos</p>
                <a class="movie-card__button" href="peli-info.html" onclick="verPelicula(${pelicula.peliculaId})">Ver más</a>
            `;
            contenedorPeliculas.appendChild(card);
        });
    }

    // Función buscar películas por título
    async function buscarPeliculasPorTitulo() {
        const entradaTitulo = document.getElementById("search-title").value.trim();
        const entradaGenero = document.getElementById("search-genre").value;

        if (entradaTitulo === "") {
            if (entradaGenero !== "") {
                buscarPeliculasPorGenero();
            } else {
                peliculasFiltradas = todasLasPeliculas.slice();
                totalPaginas = Math.ceil(peliculasFiltradas.length / peliculasPorPagina);
                mostrarPeliculasPorPagina(1);
            }
            return;
        }

        let filtradasPorGenero = todasLasPeliculas.slice();
        if (entradaGenero !== "") {
            filtradasPorGenero = todasLasPeliculas.filter(pelicula =>
                pelicula.genero && pelicula.genero.toLowerCase().includes(entradaGenero.toLowerCase())
            );
        }

        peliculasFiltradas = filtradasPorGenero.filter(pelicula =>
            pelicula.title && pelicula.title.toLowerCase().includes(entradaTitulo.toLowerCase())
        );

        totalPaginas = Math.ceil(peliculasFiltradas.length / peliculasPorPagina);
        mostrarPeliculasPorPagina(1);
    }

    // Función buscar películas por género
    async function buscarPeliculasPorGenero() {
        const entradaGenero = document.getElementById("search-genre").value;

        if (entradaGenero === "") {
            peliculasFiltradas = todasLasPeliculas.slice();
            totalPaginas = Math.ceil(peliculasFiltradas.length / peliculasPorPagina);
            mostrarPeliculasPorPagina(1);
            return;
        }

        peliculasFiltradas = todasLasPeliculas.filter(pelicula =>
            pelicula.genero && pelicula.genero.toLowerCase().includes(entradaGenero.toLowerCase())
        );

        totalPaginas = Math.ceil(peliculasFiltradas.length / peliculasPorPagina);
        mostrarPeliculasPorPagina(1);
    }

    // Función mostrar mensaje
    function mostrarMensaje(mensaje) {
        const contenedorMensaje = document.getElementById("pagination");
        if (contenedorMensaje) {
            contenedorMensaje.textContent = mensaje;
            contenedorMensaje.style.display = "block";
        }
    }

    // Función ocultar mensaje
    function ocultarMensaje() {
        const contenedorMensaje = document.getElementById("pagination");
        if (contenedorMensaje) {
            contenedorMensaje.style.display = "none";
        }
    }

    // Función actualizar los botones de página
    function actualizarPaginacion(totalPaginas, paginaActual) {
        const contenedorPaginacion = document.getElementById("pagination");
        contenedorPaginacion.innerHTML = ""; // Limpiar contenido anterior
    
        if (totalPaginas <= 1) {
            contenedorPaginacion.style.display = "none"; // Ocultar si solo hay una página
            return;
        }
    
        contenedorPaginacion.style.display = "flex"; // Mostrar paginación
    
        // Botón anterior
        if (paginaActual > 1) {
            const botonAnterior = document.createElement("button");
            botonAnterior.textContent = "Anterior";
            botonAnterior.classList.add("pagination-button");
            botonAnterior.addEventListener("click", () => mostrarPeliculasPorPagina(paginaActual - 1));
            contenedorPaginacion.appendChild(botonAnterior);
        }
    
        // Botones de número de página
        for (let i = 1; i <= totalPaginas; i++) {
            const boton = document.createElement("button");
            boton.textContent = i;
            boton.classList.add("pagination-button");
    
            if (i === paginaActual) {
                boton.classList.add("active"); // Resaltar botón activo
            }
    
            boton.addEventListener("click", () => mostrarPeliculasPorPagina(i));
            contenedorPaginacion.appendChild(boton);
        }
    
        // Botón siguiente
        if (paginaActual < totalPaginas) {
            const botonSiguiente = document.createElement("button");
            botonSiguiente.textContent = "Siguiente";
            botonSiguiente.classList.add("pagination-button");
            botonSiguiente.addEventListener("click", () => mostrarPeliculasPorPagina(paginaActual + 1));
            contenedorPaginacion.appendChild(botonSiguiente);
        }
    }

    // Función mostrar películas por página
    function mostrarPeliculasPorPagina(pagina) {
        paginaActual = pagina;
        const indiceInicio = (pagina - 1) * peliculasPorPagina;
        const indiceFin = indiceInicio + peliculasPorPagina;
        const peliculasAMostrar = peliculasFiltradas.slice(indiceInicio, indiceFin);

        mostrarPeliculas(peliculasAMostrar);
        actualizarPaginacion(totalPaginas, pagina);
    }

    // Función guardar el ID de la película seleccionada
    window.verPelicula = function (peliculaId) {
        localStorage.setItem("selectedPeliculaId", peliculaId);
    };

    cargarPeliculas();

    // Eventos de búsqueda
    document.getElementById("search-title").addEventListener("input", buscarPeliculasPorTitulo);
    document.getElementById("search-genre").addEventListener("change", buscarPeliculasPorGenero);
});