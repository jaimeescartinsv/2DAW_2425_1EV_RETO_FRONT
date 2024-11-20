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
            console.log('Datos recibidos de la API:', peliculas);
            if (peliculas.length > 0) {
                todasLasPeliculas = peliculas;
                peliculasFiltradas = todasLasPeliculas.slice();
                totalPaginas = Math.ceil(peliculasFiltradas.length / peliculasPorPagina);
                mostrarPeliculasPorPagina(paginaActual);
            } else {
                console.error("No hay películas disponibles en la API.");
                mostrarMensaje("No hay películas disponibles en este momento.");
            }
        } catch (error) {
            console.error("Error al cargar las películas:", error);
            mostrarMensaje("Error al cargar las películas. Por favor, intenta más tarde.");
        }
    }

    // Función mostrar las películas en la cuadrícula
    function mostrarPeliculas(peliculas) {
        const contenedorPeliculas = document.getElementById("contenedorPeliculas");
        if (!contenedorPeliculas) {
            console.error("Contenedor de la cartelera no encontrado.");
            return;
        }

        contenedorPeliculas.innerHTML = "";

        if (peliculas.length === 0) {
            mostrarMensaje("No se encontraron películas.");
            return;
        }

        ocultarMensaje();

        peliculas.forEach((pelicula) => {
            const col = document.createElement("div");
            col.classList.add("col-md-4", "mb-4");

            col.innerHTML = `
                <div class="card pelicula-card h-100">
                    <img src="${pelicula.imageUrl || 'https://via.placeholder.com/300x400'}" class="card-img-top" alt="${pelicula.title}">
                    <div class="card-body">
                        <h5 class="card-title">${pelicula.title || "Título no disponible"}</h5>
                        <p class="card-text">${pelicula.description || "Sin descripción disponible."}</p>
                        <p class="card-text"><strong>Duración:</strong> ${pelicula.duration || "N/A"} minutos</p>
                        <a href="../pelicula/pelicula.html" class="btn btn-primary w-100" onclick="verPelicula(${pelicula.peliculaId})">Ver más</a>
                    </div>
                </div>
            `;
            contenedorPeliculas.appendChild(col);
        });
    }

    // Función buscar películas por título
    async function buscarPeliculasPorTitulo() {
        const entradaTitulo = document.getElementById("buscarPorTitulo").value.trim();
        const entradaGenero = document.getElementById("buscarPorGenero").value;

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

        try {
            let filtradasPorGenero = todasLasPeliculas.slice();
            if (entradaGenero !== "") {
                filtradasPorGenero = todasLasPeliculas.filter(pelicula =>
                    pelicula.genero && pelicula.genero.toLowerCase().includes(entradaGenero.toLowerCase())
                );
            }

            peliculasFiltradas = filtradasPorGenero.filter(pelicula =>
                pelicula.title && pelicula.title.toLowerCase().includes(entradaTitulo.toLowerCase())
            );

            if (peliculasFiltradas.length > 0) {
                totalPaginas = Math.ceil(peliculasFiltradas.length / peliculasPorPagina);
                mostrarPeliculasPorPagina(1);
            } else {
                console.error("No se encontraron películas con ese título y categoría.");
                peliculasFiltradas = [];
                totalPaginas = 0;
                mostrarPeliculas([]);
                actualizarPaginacion(totalPaginas, 1);
            }
        } catch (error) {
            console.error("Error al buscar películas por título:", error);
            mostrarMensaje("Error al buscar películas. Por favor, intenta más tarde.");
        }
    }

    // Función buscar películas por género
    async function buscarPeliculasPorGenero() {
        const entradaGenero = document.getElementById("buscarPorGenero").value;

        if (entradaGenero === "") {
            peliculasFiltradas = todasLasPeliculas.slice();
            totalPaginas = Math.ceil(peliculasFiltradas.length / peliculasPorPagina);
            mostrarPeliculasPorPagina(1);
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/peliculas/buscar-por-género?genero=${encodeURIComponent(entradaGenero)}`
            );
            if (response.ok) {
                peliculasFiltradas = await response.json();
                totalPaginas = Math.ceil(peliculasFiltradas.length / peliculasPorPagina);
                mostrarPeliculasPorPagina(1);
            } else {
                console.error(`No se encontraron películas con el género: ${entradaGenero}.`);
                peliculasFiltradas = [];
                totalPaginas = 0;
                mostrarPeliculas([]);
                actualizarPaginacion(totalPaginas, 1);
            }
        } catch (error) {
            console.error("Error al buscar películas por género:", error);
            mostrarMensaje("Error al buscar películas. Por favor, intenta más tarde.");
        }
    }

    // Función mostrar mensaje
    function mostrarMensaje(mensaje) {
        const contenedorMensaje = document.getElementById("contenedorMensaje");
        if (contenedorMensaje) {
            contenedorMensaje.textContent = mensaje;
            contenedorMensaje.style.display = "block";
        }
    }

    // Función ocultar mensaje
    function ocultarMensaje() {
        const contenedorMensaje = document.getElementById("contenedorMensaje");
        if (contenedorMensaje) {
            contenedorMensaje.style.display = "none";
        }
    }

    // Función actualizar los botones de página
    function actualizarPaginacion(totalPaginas, paginaActual) {
        const contenedorPaginacion = document.getElementById("paginacion");
        contenedorPaginacion.innerHTML = "";

        for (let i = 1; i <= totalPaginas; i++) {
            const li = document.createElement("li");
            li.classList.add("page-item");

            if (i === paginaActual) {
                li.classList.add("active");
            }

            const a = document.createElement("a");
            a.classList.add("page-link");
            a.href = "#";
            a.textContent = i;

            a.addEventListener("click", (e) => {
                e.preventDefault();
                mostrarPeliculasPorPagina(i);
            });

            li.appendChild(a);
            contenedorPaginacion.appendChild(li);
        }
    }

    // Función manejar el cambio de página y actualizar películas
    function mostrarPeliculasPorPagina(pagina) {
        paginaActual = pagina;
        const indiceInicio = (pagina - 1) * peliculasPorPagina;
        const indiceFin = indiceInicio + peliculasPorPagina;
        const peliculasAMostrar = peliculasFiltradas.slice(indiceInicio, indiceFin);

        mostrarPeliculas(peliculasAMostrar);
        actualizarPaginacion(totalPaginas, pagina);
    }

    // Función guardar el ID de la película seleccionada en localStorage
    window.verPelicula = function (peliculaId) {
        localStorage.setItem("selectedPeliculaId", peliculaId);
    };

    cargarPeliculas();

    // Evento buscar películas por título
    document.getElementById("buscarPorTitulo").addEventListener("input", buscarPeliculasPorTitulo);

    // Evento buscar películas por género
    document.getElementById("buscarPorGenero").addEventListener("change", buscarPeliculasPorGenero);
});