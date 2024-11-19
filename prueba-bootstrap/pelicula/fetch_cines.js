document.addEventListener("DOMContentLoaded", function () {
    const apiUrlCines = "http://localhost:5000/api/cines";

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
                    throw new Error('Error al cargar el listado de cines.');
                }
            })
            .then(cines => {
                renderCines(cines);
            })
            .catch(error => {
                console.error("Error al obtener los cines desde la API:", error);
            });
    }

    // Inicializar cines
    cargarCines();
});