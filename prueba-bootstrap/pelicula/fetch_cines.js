document.addEventListener("DOMContentLoaded", function () {
    const apiUrlCines = "http://localhost:5000/api/cines";
    let cinesMap = {}; // Mapa para almacenar los cines por ID

    // Función para renderizar el listado de cines
    function renderCines(cines) {
        const cineSelect = document.getElementById("cineSelect");
        const cineError = document.getElementById("cineError");

        if (cineSelect) {
            cineSelect.innerHTML = '<option value="" selected>Selecciona un cine</option>';

            if (cines.length > 0) {
                cines.forEach(cine => {
                    cinesMap[cine.cineId] = cine.nombre; // Guardar cine en el mapa
                    const option = document.createElement("option");
                    option.value = cine.cineId;
                    option.textContent = cine.nombre;
                    cineSelect.appendChild(option);
                });
                cineError.style.display = "none";

                // Publicar el mapa de cines en un evento
                const event = new CustomEvent("cinesCargados", { detail: cinesMap });
                document.dispatchEvent(event);
            } else {
                cineError.textContent = "No hay cines disponibles.";
                cineError.style.display = "block";
            }
        } else {
            console.error("No se encontró el elemento 'cineSelect' en el DOM.");
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

    // Inicializar la carga de cines
    cargarCines();
});