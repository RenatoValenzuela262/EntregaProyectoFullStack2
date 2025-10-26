let total = 0;

function agregarAlCarrito(nombre, precio, id) {
  const stockSpan = document.getElementById(`stock-${id}`);
  let stock = parseInt(stockSpan.textContent);

  if (stock > 0) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.push({ nombre, precio, id });
    localStorage.setItem("carrito", JSON.stringify(carrito));

    stockSpan.textContent = stock - 1;
    alert(`${nombre} agregado al carrito`);
  } else {
    alert("¡Producto sin stock!");
  }
}
