function mostrarCarrito() {
  const contenedor = document.getElementById("resumen-carrito");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }

  let total = 0;

  carrito.forEach((item, index) => {
    total += item.precio;

    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>${item.nombre}</strong> - $${item.precio}</p>
      <button onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    contenedor.appendChild(div);
  });

  const totalDiv = document.createElement("p");
  totalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
  contenedor.appendChild(totalDiv);
}

function eliminarProducto(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function confirmarCompra() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carrito.length === 0) {
    alert("No hay productos para comprar.");
    return;
  }

  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  const cliente = usuarioActivo ? usuarioActivo.nombre : "Invitado";

  const ordenes = JSON.parse(localStorage.getItem("ordenes")) || [];
  const fecha = new Date().toISOString().split('T')[0];

  carrito.forEach(item => {
    const nuevaOrden = {
      fecha: fecha,
      cliente: cliente,
      producto: item.nombre,
      estado: "Pendiente",
      total: item.precio
    };
    ordenes.push(nuevaOrden);
  });

  localStorage.setItem("ordenes", JSON.stringify(ordenes));
  localStorage.removeItem("carrito");

  alert("¡Compra confirmada y órdenes registradas!");
  mostrarCarrito();
}


window.onload = mostrarCarrito;
