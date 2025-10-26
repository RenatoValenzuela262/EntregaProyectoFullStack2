// Importar funciones del módulo de registro
import { validarCorreo, obtenerUsuarios, usuarioExiste } from './registro.js';

// Elementos del DOM
let usersList, refreshBtn, nuevoUsuarioBtn, modal, cerrarModal, form;

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    inicializarApp();
});

function inicializarApp() {
    console.log('Inicializando aplicación de usuarios...');
    
    // Obtener referencias a los elementos del DOM
    usersList = document.getElementById('usersList');
    refreshBtn = document.getElementById('btn-refresh');
    nuevoUsuarioBtn = document.getElementById('btn-nuevo-usuario');
    modal = document.getElementById('modal-usuario');
    cerrarModal = document.getElementById('cerrar-modal');
    form = document.getElementById('form-admin-usuario');
    
    // Verificar que todos los elementos existen
    if (!usersList || !refreshBtn || !nuevoUsuarioBtn || !modal || !cerrarModal || !form) {
        console.error('❌ No se encontraron algunos elementos del DOM');
        return;
    }
    
    // Configurar event listeners
    configurarEventListeners();
    
    // Cargar usuarios iniciales
    loadUsers();
    
    console.log('✅ Aplicación de usuarios inicializada correctamente');
}

function configurarEventListeners() {
    // Botones principales
    refreshBtn.addEventListener('click', refreshUsers);
    nuevoUsuarioBtn.addEventListener('click', abrirModal);
    
    // Modal
    cerrarModal.addEventListener('click', cerrarModalHandler);
    form.addEventListener('submit', handleFormSubmit);
    
    // Cerrar modal haciendo click fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            cerrarModalHandler();
        }
    });
}

// Función para cargar y mostrar los usuarios
function loadUsers() {
    console.log('Cargando usuarios...');
    
    if (!usersList) {
        console.error('❌ usersList no está definido');
        return;
    }
    
    // Obtener usuarios del localStorage
    const usuarios = obtenerUsuarios();
    console.log('Usuarios encontrados:', usuarios);
    
    if (usuarios.length === 0) {
        usersList.innerHTML = '<div class="no-users">No hay usuarios registrados</div>';
        return;
    }

    let html = '';
    usuarios.forEach(usuario => {
        const isAdmin = usuario.email === "admin@duocuc.cl";
        const canDelete = !isAdmin; // No permitir eliminar al admin
        
        html += `
            <div class="user-card">
                <div class="user-header">
                    <span class="user-name">
                        ${usuario.nombre || 'Nombre no disponible'}
                        ${isAdmin ? '<span class="admin-badge">Admin</span>' : ''}
                    </span>
                    <small>ID: ${usuario.id || 'N/A'}</small>
                </div>
                <div class="user-email">📧 ${usuario.email || 'Email no disponible'}</div>
                <div class="user-details">
                    <div class="user-detail">📍 Región: ${usuario.region || 'No especificada'}</div>
                    <div class="user-detail">🏙️ Comuna: ${usuario.comuna || 'No especificada'}</div>
                    <div class="user-detail">📅 Registro: ${usuario.fechaRegistro || 'Fecha no disponible'}</div>
                    <div class="user-detail">🔐 Contraseña: ${usuario.password ? '*'.repeat(usuario.password.length) : 'No disponible'}</div>
                </div>
                <div class="user-actions">
                    <button class="btn-eliminar" 
                            onclick="eliminarUsuario(${usuario.id})" 
                            ${canDelete ? '' : 'disabled'}
                            title="${canDelete ? 'Eliminar usuario' : 'No se puede eliminar al administrador'}">
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        `;
    });

    usersList.innerHTML = html;
}

// Función para eliminar un usuario individual
function eliminarUsuario(userId) {
    const usuarios = obtenerUsuarios();
    const usuario = usuarios.find(u => u.id === userId);
    
    if (!usuario) {
        mostrarMensaje('Usuario no encontrado', 'error');
        return;
    }
    
    // Verificar que no sea el admin
    if (usuario.email === "admin@duocuc.cl") {
        mostrarMensaje('No se puede eliminar al usuario administrador', 'error');
        return;
    }
    
    if (confirm(`¿Estás seguro de que quieres eliminar al usuario "${usuario.nombre}" (${usuario.email})? Esta acción no se puede deshacer.`)) {
        // Filtrar el usuario a eliminar
        const usuariosActualizados = usuarios.filter(u => u.id !== userId);
        
        // Guardar en localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
        
        // Recargar la lista
        loadUsers();
        
        mostrarMensaje(`Usuario "${usuario.nombre}" eliminado correctamente`, 'success');
    }
}

// Función para actualizar la lista
function refreshUsers() {
    console.log('Actualizando lista de usuarios...');
    loadUsers();
    mostrarMensaje('Lista de usuarios actualizada', 'success');
}

// Funciones del modal
function abrirModal() {
    if (modal) {
        modal.style.display = 'flex';
        form.reset();
        document.getElementById('error-admin').textContent = '';
    }
}

function cerrarModalHandler() {
    if (modal) {
        modal.style.display = 'none';
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const nombreCompleto = document.getElementById('nombreAdmin').value;
    const email = document.getElementById('emailAdmin').value;
    const password = document.getElementById('passwordAdmin').value;
    const repassword = document.getElementById('repasswordAdmin').value;
    const region = document.getElementById('regionAdmin').value;
    const comuna = document.getElementById('comunaAdmin').value;
    const errorElement = document.getElementById('error-admin');
    
    let messages = [];
    
    // Validaciones
    if (nombreCompleto.length > 100) {
        messages.push('El nombre no puede superar los 100 caracteres');
    }

    if (password.length < 4 || password.length > 10) {
        messages.push('La contraseña debe tener entre 4 a 10 caracteres');
    }

    if (password !== repassword) {
        messages.push('Las contraseñas no coinciden');
    }

    if (!email || email.trim() === '') {
        messages.push('El correo electrónico es obligatorio');
    } else if (email.length > 100) {
        messages.push('El correo no puede superar los 100 caracteres');
    } else if (!validarCorreo(email)) {
        messages.push('El correo debe ser @duocuc.cl, @profesor.duoc.cl o @gmail.com');
    }

    if (messages.length > 0) {
        errorElement.style.color = 'red';
        errorElement.textContent = messages.join('\n');
        return;
    }
    
    // Verificar si el email ya existe
    if (usuarioExiste(email)) {
        errorElement.style.color = 'red';
        errorElement.textContent = 'Este correo electrónico ya está registrado';
        return;
    }
    
    // Crear nuevo usuario
    const usuarioData = {
        id: Date.now(),
        nombre: nombreCompleto,
        email: email,
        password: password,
        region: region,
        comuna: comuna,
        fechaRegistro: new Date().toLocaleString('es-ES')
    };
    
    const usuarios = obtenerUsuarios();
    usuarios.push(usuarioData);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    errorElement.style.color = 'green';
    errorElement.textContent = '✅ Usuario creado exitosamente!';
    
    // Limpiar formulario y recargar lista después de 1 segundo
    setTimeout(() => {
        form.reset();
        cerrarModalHandler();
        loadUsers();
        errorElement.textContent = '';
    }, 1000);
}

// Función auxiliar para mostrar mensajes
function mostrarMensaje(mensaje, tipo = 'info') {
    console.log(`${tipo.toUpperCase()}: ${mensaje}`);
    // Podrías implementar un sistema de notificaciones visual aquí
    if (tipo === 'success') {
        alert(`✅ ${mensaje}`);
    } else if (tipo === 'error') {
        alert(`❌ ${mensaje}`);
    }
}

// Hacer funciones disponibles globalmente para poder usarlas en los onclick
window.eliminarUsuario = eliminarUsuario;
window.refreshUsers = refreshUsers;

// Hacer funciones disponibles globalmente para debugging
window.debugUsuarios = function() {
    console.log('=== DEBUG USUARIOS ===');
    console.log('LocalStorage "usuarios":', localStorage.getItem('usuarios'));
    console.log('Usuarios parseados:', obtenerUsuarios());
    console.log('Elemento usersList:', usersList);
    loadUsers();
};