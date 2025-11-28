import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

function Ordenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

  const fetchOrdenes = async () => {
    try {
      const headers = { "Content-Type": "application/json" };
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch("http://localhost:8080/api/orden", {
        headers,
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "No autorizado. Por favor inicia sesión como administrador."
          );
        }
        throw new Error("No se pudieron cargar las órdenes");
      }
      const data = await response.json();
      setOrdenes(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchOrdenes();
  }, []);

  const handleVerDetalle = (orden) => {
    setOrdenSeleccionada(orden);
    setShowModal(true);
  };

  const handleCerrarModal = () => {
    setShowModal(false);
    setOrdenSeleccionada(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Gestión de Órdenes</h2>

      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden) => (
            <tr key={orden.id}>
              <td>{orden.id}</td>
              <td>{orden.nombreCliente}</td>
              <td>{orden.fecha}</td>
              <td>
                <span
                  className={`badge ${
                    orden.estado === "Pendiente"
                      ? "bg-warning"
                      : orden.estado === "Completada"
                      ? "bg-success"
                      : "bg-secondary"
                  }`}
                >
                  {orden.estado}
                </span>
              </td>
              <td>${new Intl.NumberFormat("es-CL").format(orden.total)}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleVerDetalle(orden)}
                >
                  Ver Detalle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCerrarModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Detalles de la Orden #{ordenSeleccionada?.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ordenSeleccionada && (
            <div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <strong>Cliente:</strong> {ordenSeleccionada.nombreCliente}
                </div>
                <div className="col-md-6">
                  <strong>Fecha:</strong> {ordenSeleccionada.fecha}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <strong>Estado:</strong>
                  <span
                    className={`badge ms-2 ${
                      ordenSeleccionada.estado === "Pendiente"
                        ? "bg-warning"
                        : ordenSeleccionada.estado === "Completada"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {ordenSeleccionada.estado}
                  </span>
                </div>
                <div className="col-md-6">
                  <strong>Total:</strong> $
                  {new Intl.NumberFormat("es-CL").format(
                    ordenSeleccionada.total
                  )}
                </div>
              </div>

              <h5>Productos:</h5>
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {ordenSeleccionada.detalles.map((detalle, index) => (
                    <tr key={index}>
                      <td>{detalle.nombreProducto}</td>
                      <td>{detalle.cantidad}</td>
                      <td>
                        $
                        {new Intl.NumberFormat("es-CL").format(
                          detalle.precioUnitario
                        )}
                      </td>
                      <td>
                        $
                        {new Intl.NumberFormat("es-CL").format(
                          detalle.subTotal
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCerrarModal}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Ordenes;
