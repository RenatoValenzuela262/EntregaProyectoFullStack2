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

    // Si pasa todo → login exitoso
    errorElementLogin.style.color = 'green';
    errorElementLogin.innerText = '✅ Inicio de sesión exitoso';

    // Guardar sesión
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));

    // Redirigir al dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 2000);
});
