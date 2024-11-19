document.addEventListener('DOMContentLoaded', () => {
    const createUserForm = document.getElementById('createUserForm');
    const loginForm = document.getElementById('loginForm');
    const loginFormContainer = document.getElementById('loginFormContainer');
    const switchToLogin = document.getElementById('switchToLogin');
    const switchToRegister = document.getElementById('switchToRegister');
    
    // Cambiar entre formularios
    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        createUserForm.parentElement.style.display = 'none';
        loginFormContainer.style.display = 'block';
    });

    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginFormContainer.style.display = 'none';
        createUserForm.parentElement.style.display = 'block';
    });

    // Manejar inicio de sesión
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const usernameOrEmail = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('http://localhost:5000/api/usuarios', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al conectar con la API');
            }

            const usuarios = await response.json();
            console.log('Usuarios retornados por la API:', usuarios);

            // Verificar credenciales
            const usuario = usuarios.find(u =>
                (u.correo.trim() === usernameOrEmail.trim() || u.nombre.trim() === usernameOrEmail.trim()) &&
                u.contrasena.trim() === password.trim()
            );

            if (usuario) {
                alert(`¡Bienvenido, ${usuario.nombre}!`);
                // Guardar usuario en localStorage
                localStorage.setItem('usuario', JSON.stringify(usuario));
                // Redirigir al index.html
                window.location.href = '../index/index.html';
            } else {
                alert('Credenciales incorrectas. Intenta nuevamente.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al intentar iniciar sesión.');
        }
    });

    // Manejar registro de usuario
    createUserForm.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const nombre = document.getElementById('createUsername').value;
        const correo = document.getElementById('createEmail').value;
        const contrasena = document.getElementById('createPassword').value;
    
        // Generar un ID válido (Número aleatorio entre 1 y 1,000,000)
        const usuarioId = Math.floor(Math.random() * 1000000) + 1;
    
        const nuevoUsuario = {
            usuarioId: usuarioId,
            nombre: nombre,
            correo: correo,
            contrasena: contrasena,
        };
    
        try {
            const response = await fetch('http://localhost:5000/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoUsuario),
            });
    
            if (response.ok) {
                alert('Usuario creado exitosamente. Ahora puedes iniciar sesión.');
                // Cambiar al formulario de inicio de sesión automáticamente
                createUserForm.parentElement.style.display = 'none';
                loginFormContainer.style.display = 'block';
            } else {
                // Obtener y mostrar el mensaje de error del backend
                const errorData = await response.json();
                const errorMessage = errorData.detail || errorData.title || "Ocurrió un error.";
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al intentar crear el usuario.');
        }
    });
});