document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tabla-productos");

  // Obtener productos desde localStorage
  let productos = JSON.parse(localStorage.getItem("productos")) || [];

  // Renderizar la tabla
  function renderTabla() {
    tabla.innerHTML = "";

    if (productos.length === 0) {
      tabla.innerHTML = `<tr><td colspan="4">No hay productos disponibles</td></tr>`;
      return;
    }

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

  // Guardar cambios al hacer clic en "Guardar"
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
      alert("✅ Producto actualizado correctamente");
    }
  });

  renderTabla();
});

