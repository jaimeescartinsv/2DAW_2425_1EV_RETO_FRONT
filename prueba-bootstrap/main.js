document.addEventListener('DOMContentLoaded', () => {
    const userNav = document.getElementById('userNav');

    // Mostrar "Cerrar sesión" si el usuario está logueado
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioGuardado) {
        userNav.innerHTML = `
            <a class="nav-link" id="logoutLink" href="#">
                <i class="bi bi-person-circle"></i> Cerrar sesión
            </a>`;
        
        // Agregar evento para cerrar sesión
        const logoutLink = document.getElementById('logoutLink');
        logoutLink.addEventListener('click', () => {
            localStorage.removeItem('usuario');
            window.location.href = '../user/user.html';
        });
    }
});