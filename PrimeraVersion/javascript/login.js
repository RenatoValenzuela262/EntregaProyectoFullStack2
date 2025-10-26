const emailLogin = document.getElementById('email-login');
const passwordLogin = document.getElementById('password-login');
const formLogin = document.getElementById('form-login');
const errorElementLogin = document.getElementById('error-login');

formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    let messages = [];

    // Validaciones básicas
    if (!emailLogin.value || emailLogin.value.trim() === '') {
        messages.push('El correo electrónico es obligatorio');
    }
    if (!passwordLogin.value) {
        messages.push('La contraseña es obligatoria');
    }

    if (messages.length > 0) {
        errorElementLogin.style.color = 'red';
        errorElementLogin.innerText = messages.join('\n');
        return;
    }

    // Obtener usuarios guardados en LocalStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Buscar usuario por correo
    const usuario = usuarios.find(user => user.email === emailLogin.value);

    if (!usuario) {
        errorElementLogin.style.color = 'red';
        errorElementLogin.innerText = 'Usuario no encontrado. Regístrate primero.';
        return;
    }

    // Verificar contraseña
    if (usuario.password !== passwordLogin.value) {
        errorElementLogin.style.color = 'red';
        errorElementLogin.innerText = 'Contraseña incorrecta';
        return;
    }

    // Guardar sesión
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

    // Mostrar mensaje de éxito
    errorElementLogin.style.color = 'green';
    errorElementLogin.innerText = '✅ Inicio de sesión exitoso';

    // Redirigir según tipo de usuario
    setTimeout(() => {
        if (
            usuario.email === "admin@duocuc.cl" &&
            usuario.password === "admin123"
        ) {
            window.location.href = "admin/index.html";
        } else {
            window.location.href = "dashboard.html"; // o "inicio.html" si prefieres
        }
    }, 1500);
});
