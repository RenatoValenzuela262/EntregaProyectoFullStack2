import { useState } from "react";
import "./AdmProductos.css";

function CrearProducto({ onProductoCreado, onCancelar }) {
  const [productoData, setProductoData] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen: "", // <-- 1. Añadido el campo de imagen al estado
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // 'productoData' ahora incluye el campo 'imagen'
        body: JSON.stringify(productoData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al crear producto");
      }

      alert("¡Producto creado con éxito!");
      onProductoCreado();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre-input" className="form-label">
            Nombre Producto
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre-input"
            required
            name="nombre"
            value={productoData.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="categoria-input" className="form-label">
            Categoría
          </label>
          <input
            type="text"
            className="form-control"
            id="categoria-input"
            required
            name="categoria"
            value={productoData.categoria}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="descripcion-input" className="form-label">
            Descripcion
          </label>
          <input
            type="text"
            className="form-control"
            id="descripcion-input"
            required
            name="descripcion"
            value={productoData.descripcion}
            onChange={handleChange}
            size={3}
          />
        </div>

        {/* --- 2. NUEVO INPUT PARA LA URL DE LA IMAGEN --- */}
        <div className="mb-3">
          <label htmlFor="imagen-input" className="form-label">
            URL de la Imagen (Pinterest, etc.)
          </label>
          <input
            type="url"
            className="form-control"
            id="imagen-input"
            required
            name="imagen"
            value={productoData.imagen}
            onChange={handleChange}
            placeholder="https://i.pinimg.com/..."
          />
        </div>
        {/* --- FIN DEL NUEVO INPUT --- */}

        <div className="mb-3">
          <label htmlFor="precio-input" className="form-label">
            Precio
          </label>
          <input
            type="number"
            className="form-control"
            id="precio-input"
            required
            name="precio"
            value={productoData.precio}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="stock-input" className="form-label">
            Stock
          </label>
          <input
            type="number"
            className="form-control"
            id="stock-input"
            required
            name="stock"
            value={productoData.stock}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="button"
            onClick={onCancelar}
            className="btn boton-cancelar me-2"
          >
            Cancelar
          </button>

          <button type="submit" className="btn color-boton">
            Crear Producto
          </button>
        </div>
      </form>
    </>
  );
}

export default CrearProducto;
