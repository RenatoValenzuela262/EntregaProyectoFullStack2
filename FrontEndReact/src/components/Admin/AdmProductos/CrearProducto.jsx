import { useState } from "react";
import "./Productos.css";

function CrearProducto({ onProductoCreado, onCancelar }) {
  const [productoData, setProductoData] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    precio: "",
    stock: "",
  });

  const [imagen, setImagen] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imagen) {
      alert("Por favor, selecciona una imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("imagen", imagen);
    formData.append("producto", JSON.stringify(productoData));

    try {
      const response = await fetch("http://localhost:8080/api/productos", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al crear producto");
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

        <div className="mb-3">
          <label htmlFor="imagen-input" className="form-label">
            Imagen del Producto
          </label>
          <input
            type="file"
            className="form-control"
            id="imagen-input"
            required
            name="imagen"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
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
