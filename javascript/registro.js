const nombreCompleto = document.getElementById('nombreCompleto')
const email = document.getElementById('email')
const password = document.getElementById('password')
const repassword = document.getElementById('repassword')
const region = document.getElementById('region')
const comuna = document.getElementById('comunas')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')

// ✅ Insertar administrador si no existe
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
const adminExiste = usuarios.some(user => user.email === "admin@duocuc.cl")

if (!adminExiste) {
    const admin = {
        id: Date.now(),
        nombre: "Administrador",
        email: "admin@duocuc.cl",
        password: "admin123",
        region: "Metropolitana",
        comuna: "Santiago",
        fechaRegistro: new Date().toLocaleString('es-ES')
    }
    usuarios.push(admin)
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
}

form.addEventListener('submit', (e) => {
    let messages = []
    
    if (nombreCompleto.value.length > 100){
        messages.push('El nombre no puede superar los 100 caracteres')
    }

    if (password.value.length < 4 || password.value.length > 10){
        messages.push('La contraseña debe tener entre 4 a 10 caracteres')
    }

    if(password.value != repassword.value){
        messages.push('Las contraseñas no coinciden')
    }

    if (!email.value || email.value.trim() === '') {
        messages.push('El correo electrónico es obligatorio')
    }else if (email.value.length > 100){
        messages.push('El correo no puede superar los 100 caracteres')
    }else if (!validarCorreo(email.value)) {
        messages.push('El correo debe ser @duocuc.cl, @profesor.duoc.cl o @gmail.com')
    }

    if(messages.length > 0){
        e.preventDefault()
        errorElement.style.color = 'red'
        errorElement.innerText = messages.join('\n')
    } else {
        e.preventDefault() // Prevenir envío del formulario
        
        const usuarioData = {
            id: Date.now(),
            nombre: nombreCompleto.value,
            email: email.value,
            password: password.value,
            region: region.value,
            comuna: comuna.value,
            fechaRegistro: new Date().toLocaleString('es-ES')
        }
        
        const emailExiste = usuarios.some(user => user.email === email.value)
        if (emailExiste) {
            errorElement.style.color = 'red'
            errorElement.innerText = 'Este correo electrónico ya está registrado'
            return
        }
        
        usuarios.push(usuarioData)
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
        localStorage.setItem('usuarioActivo', JSON.stringify(usuarioData))

        errorElement.style.color = 'green'
        errorElement.innerText = '✅ Registro exitoso! Datos guardados.'
        form.reset()
        console.log('Usuario guardado:', usuarioData)
    }
})

// Función para ver usuarios guardados
function verUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    console.log('Usuarios registrados:', usuarios)
    return usuarios
}

window.verUsuarios = verUsuarios

// Funciones compartidas
export function validarCorreo(correo) {
    const dominiosPermitidos = ['@duocuc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return dominiosPermitidos.some(dominio => correo.toLowerCase().endsWith(dominio));
}

export function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
}

export function usuarioExiste(email) {
    const usuarios = obtenerUsuarios();
    return usuarios.some(user => user.email === email);
}

export function buscarUsuarioPorEmail(email) {
    const usuarios = obtenerUsuarios();
    return usuarios.find(user => user.email === email);
}

// Exportar a JSON
function exportarJSON() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    const jsonString = JSON.stringify(usuarios, null, 2)
    
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'usuarios.json'
    a.click()
    URL.revokeObjectURL(url)
}

// Limpiar datos
function limpiarDatos() {
    localStorage.removeItem('usuarios')
    errorElement.style.color = 'blue'
    errorElement.innerText = 'Datos limpiados correctamente'
}
