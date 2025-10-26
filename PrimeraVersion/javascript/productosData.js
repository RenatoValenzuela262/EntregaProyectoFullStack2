document.addEventListener("DOMContentLoaded", () => {
  const productosIniciales = [
    { id: 1, nombre: "Gomitas Arcoiris", precio: 1500, stock: 30, imagen: "imagenes/gomitasdearcoiris.png" },
    { id: 2, nombre: "Bombones de Chocolate", precio: 2000, stock: 40, imagen: "imagenes/bomboneschocolate.png" },
    { id: 3, nombre: "Caramelos Ácidos", precio: 1200, stock: 45, imagen: "imagenes/caramelosacidos.png" },
    { id: 4, nombre: "Dulces de Merengue", precio: 1000, stock: 60, imagen: "imagenes/merengues.png" },
    { id: 5, nombre: "Paleta Frutal", precio: 800, stock: 35, imagen: "imagenes/paletadulce.png" }
  ];

  if (!localStorage.getItem("productos")) {
    localStorage.setItem("productos", JSON.stringify(productosIniciales));
  }
});
