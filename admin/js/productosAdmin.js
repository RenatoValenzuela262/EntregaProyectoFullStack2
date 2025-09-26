document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tabla-productos");

  // Cargar productos iniciales si no existen
  let productos = JSON.parse(localStorage.getItem("productos"));
  if (!productos || productos.length === 0) {
    productos = [
      { nombre: "Gomitas Arcoíris", precio: 1000, stock: 10 },
      { nombre: "Bombones de Chocolate", precio: 2000, stock: 8 },
      { nombre: "Caramelos Ácidos", precio: 1500, stock: 12 },
      { nombre: "Dulces de Merengue", precio: 2000, stock: 15 },
      { nombre: "Paleta Frutal", precio: 800, stock: 9 }
    ];
    localStorage.setItem("productos", JSON.stringify(productos));
  }

  function renderTabla() {
    tabla.innerHTML = "";

    productos.forEach((producto, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${producto.nombre}</td>
        <td><input type="number" value="${producto.precio}" min="0" id="precio-${index}"></td>
        <td><input type="number" value="${producto.stock}" min="0" id="stock-${index}"></td>
        <td><button class="guardar" data-index="${index}">Guardar</button></td>
      `;
      tabla.appendChild(fila);
    });
  }

  tabla.addEventListener("click", (e) => {
    if (e.target.classList.contains("guardar")) {
      const index = e.target.dataset.index;
      const nuevoPrecio = parseFloat(document.getElementById(`precio-${index}`).value);
      const nuevoStock = parseInt(document.getElementById(`stock-${index}`).value);

      if (isNaN(nuevoPrecio) || isNaN(nuevoStock)) {
        alert("❌ Precio o stock inválido");
        return;
      }

      productos[index].precio = nuevoPrecio;
      productos[index].stock = nuevoStock;
      localStorage.setItem("productos", JSON.stringify(productos));
      alert("✅ Producto actualizado");
    }
  });

  renderTabla();
});
