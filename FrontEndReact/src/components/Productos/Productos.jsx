import { useState, useEffect } from "react";
// CAMBIO: La ruta ahora es local
import { useCart } from "./CartContext";
import "./Productos.css";

function Productos() {
  const [productos, setProductos] = useState([]);
  const { addToCart } = useCart();

  const fetchProductos = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/productos");

      if (!response.ok) {
        throw new Error("No se pudieron cargar los productos");
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row mt-10 g-4">
          {productos.map((producto) => (
            <div className="col-4" key={producto.idProducto}>
              <div className="card color-card h-100">
                <img
                  src={producto.imagen}
                  className="card-img-top"
                  alt={producto.nombre}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/600x400/F8E8E8/FF87AB?text=Sin+Imagen";
                  }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text">{producto.descripcion}</p>
                  <h6 className="card-subtitle mb-2 text-muted">
                    ${new Intl.NumberFormat("es-CL").format(producto.precio)}
                  </h6>
                  <button
                    type="button"
                    className="btn color-btn mt-auto"
                    onClick={() => addToCart(producto)}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Productos;
