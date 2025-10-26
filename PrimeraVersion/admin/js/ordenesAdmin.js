// PAGINACIÓN DE ÓRDENES
const ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
const tabla = document.getElementById("tabla-ordenes");
const paginaActual = document.getElementById("pagina-actual");
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");

let pagina = 1;
const porPagina = 5;

function renderTabla() {
  tabla.innerHTML = "";
  const inicio = (pagina - 1) * porPagina;
  const fin = inicio + porPagina;
  const ordenesPagina = ordenes.slice(inicio, fin);

  ordenesPagina.forEach((orden, i) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${orden.fecha}</td>
      <td>SO/${inicio + i + 1}</td>
      <td>${orden.cliente}</td>
      <td>${orden.estado}</td>
      <td>$${orden.total}</td>
    `;
    tabla.appendChild(fila);
  });

  paginaActual.textContent = pagina;
}

btnPrev.onclick = () => {
  if (pagina > 1) {
    pagina--;
    renderTabla();
  }
};

btnNext.onclick = () => {
  if (pagina * porPagina < ordenes.length) {
    pagina++;
    renderTabla();
  }
};

renderTabla();

// MODAL DE CREACIÓN DE USUARIO
document.addEventListener("DOMContentLoaded", () => {
  const btnNuevo = document.getElementById("btn-nuevo-usuario");
  const modal = document.getElementById("modal-usuario");
  const cerrarModal = document.getElementById("cerrar-modal");
  const formAdmin = document.getElementById("form-admin-usuario");
  const errorAdmin = document.getElementById("error-admin");

  // Mostrar el modal
  btnNuevo.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Cerrar el modal
  cerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Crear usuario desde el formulario
  formAdmin.addEventListener("submit", (e) => {
    e.preventDefault();
    errorAdmin.textContent = "";

    const nombre = document.getElementById("nombreAdmin").value.trim();
    const email = document.getElementById("emailAdmin").value.trim();
    const pass = document.getElementById("passwordAdmin").value;
    const repass = document.getElementById("repasswordAdmin").value;
    const region = document.getElementById("regionAdmin").value;
    const comuna = document.getElementById("comunaAdmin").value;

    const errores = [];
    if (nombre.length > 100) errores.push("El nombre no puede superar los 100 caracteres");
    if (pass.length < 4 || pass.length > 10) errores.push("La contraseña debe tener entre 4 y 10 caracteres");
    if (pass !== repass) errores.push("Las contraseñas no coinciden");
    if (!email || !validarCorreo(email)) errores.push("Correo inválido o no permitido");

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (usuarios.some(u => u.email === email)) errores.push("Este correo ya está registrado");

    if (errores.length > 0) {
      errorAdmin.textContent = errores.join("\n");
      return;
    }

    const nuevoUsuario = {
      id: Date.now(),
      nombre,
      email,
      password: pass,
      region,
      comuna,
      fechaRegistro: new Date().toLocaleString('es-ES')
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("✅ Usuario creado exitosamente");
    modal.style.display = "none";
    formAdmin.reset();
  });
});

// VALIDACIÓN DE CORREO
function validarCorreo(correo) {
  const dominiosPermitidos = ['@duocuc.cl', '@profesor.duoc.cl', '@gmail.com'];
  return dominiosPermitidos.some(d => correo.toLowerCase().endsWith(d));
}

