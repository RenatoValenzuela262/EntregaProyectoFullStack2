import { useState, useEffect } from "react";
import "./AdmProductos.css";

function EditarProducto({ producto, onProductoEditado, onCancelar }) {
  const [productoData, setProductoData] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen: "",
  });

  useEffect(() => {
    if (producto) {
      setProductoData({
        nombre: producto.nombre,
        categoria: producto.categoria,
        descripcion: producto.descripcion,
        precio: producto.precio,
        stock: producto.stock,
        imagen: producto.imagen,
      });
    }
  }, [producto]);

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
      // --- CORRECCIÓN DEFINITIVA AQUÍ ---
      // El campo en tu JSON se llama 'idProducto', no 'id'
      const response = await fetch(
        `http://localhost:8080/api/productos/${producto.idProducto}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productoData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al actualizar producto");
      }

      alert("¡Producto actualizado con éxito!");
      onProductoEditado();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* ... (el resto de tu formulario) ... */}

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
            Guardar Cambios
          </button>
        </div>
      </form>
    </>
  );
}

export default EditarProducto;
