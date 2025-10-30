import { useState, useEffect } from "react";
import "./Productos.css";

function Productos() {
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    try {
      const response = await fetch("/api/productos");
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
            <div className="col-4" key={producto.id}>
              <div className="card color-card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text">{producto.descripcion}</p>
                  <h6 className="card-subtitle mb-2 text-muted">
                    ${new Intl.NumberFormat("es-CL").format(producto.precio)}
                  </h6>
                  <button type="button" className="btn color-btn mt-auto">
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
