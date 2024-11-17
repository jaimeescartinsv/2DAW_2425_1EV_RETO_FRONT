// Función para activar/desactivar el menú hamburguesa
document.querySelector('.header__menu-toggle').addEventListener('click', function () {
    // Alterna la clase 'nav--menu-active' para abrir o cerrar el menú
    document.querySelector('.nav').classList.toggle('nav--menu-active');
});

// Cerrar el menú al hacer clic en el botón de cierre
document.querySelector('.nav__close-button').addEventListener('click', function () {
    // Remueve la clase 'nav--menu-active' para cerrar el menú
    document.querySelector('.nav').classList.remove('nav--menu-active');
});

// Funcionalidad de los asientos
document.querySelectorAll('.seat').forEach(seat => {
    seat.addEventListener('click', function () {
        // Evitar clics en asientos no disponibles
        if (this.classList.contains('unavailable') || this.classList.contains('blocked')) {
            alert("Este asiento no está disponible.");
            return;
        }

        // Alternar el estado de "seleccionado"
        if (this.classList.contains('available')) {
            this.classList.toggle('selected');
            updateSelectedSeats();
        }
    });
});

// Actualizar la lista de asientos seleccionados
function updateSelectedSeats() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const seatsList = document.getElementById('seats-list');
    const continueBtn = document.getElementById('continue-btn'); // Referencia al botón CONTINUAR

    seatsList.innerHTML = ''; // Limpiar la lista

    selectedSeats.forEach(seat => {
        const seatName = seat.getAttribute('data-seat');
        const listItem = document.createElement('li');
        listItem.textContent = `Asiento: ${seatName}`;
        seatsList.appendChild(listItem);
    });

    // Si al menos un asiento está seleccionado, mostrar el botón CONTINUAR
    if (selectedSeats.length > 0) {
        continueBtn.style.display = 'block';
    } else {
        continueBtn.style.display = 'none'; // Ocultar el botón si no hay asientos seleccionados
    }
}

// Funcionalidad del botón "Atrás"
document.getElementById('back-btn').addEventListener('click', function () {
    window.history.back();
});

// Funcionalidad para fijar el footer al hacer scroll
window.addEventListener('scroll', function () {
    const footerTop = document.querySelector('.footer__top');
    const footer = document.querySelector('.footer');
    
    // Asegurarse de que el footerTop existe en el DOM
    if (!footerTop) return;

    const footerTopHeight = footerTop.offsetHeight;
    const footerOffsetTop = footer.offsetTop; // Posición superior del footer
    const viewportHeight = window.innerHeight;
    const scrollPosition = window.scrollY;

    // Si el scroll aún no llega al footer
    if (scrollPosition + viewportHeight < footerOffsetTop) {
        footerTop.style.position = 'fixed';
        footerTop.style.bottom = '0';
        footerTop.style.top = 'auto';
    } 
    // Si el scroll llega al footer
    else {
        footerTop.style.position = 'absolute';
        footerTop.style.bottom = 'auto';
        footerTop.style.top = `${footerOffsetTop - footerTopHeight}px`; // Ajusta justo encima del footer
    }
});

// Acción del botón "CONTINUAR"
document.getElementById('continue-btn').addEventListener('click', function () {
    // Redirigir al usuario a la siguiente página
    window.location.href = '/FRONT-END/source/html/next-page.html';  // Reemplaza 'next-page.html' con el URL a donde deseas redirigir
});
