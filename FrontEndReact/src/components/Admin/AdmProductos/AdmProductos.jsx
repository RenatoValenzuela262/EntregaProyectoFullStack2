import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import CrearProducto from "./CrearProducto";

function AdmProductos() {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  const handleCerrarModal = () => setShowModal(false);
  const handleAbrirModal = () => setShowModal(true);

  const handleProductoCreado = () => {
    handleCerrarModal();
    fetchProductos();
  };

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-3">Gestión de Productos</h2>

        <button
          onClick={handleAbrirModal}
          className="btn btn-primary mb-3 color-boton"
        >
          Crear Producto
        </button>

        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Descripcion</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.precio}</td>
                <td>{producto.stock}</td>
                <td>{producto.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal show={showModal} onHide={handleCerrarModal}>
          <Modal.Header closeButton>
            <Modal.Title>Crear Nuevo Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CrearProducto
              onProductoCreado={handleProductoCreado}
              onCancelar={handleCerrarModal}
            />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default AdmProductos;
