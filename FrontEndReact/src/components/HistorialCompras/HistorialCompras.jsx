import { useEffect, useState } from "react";
import { useAuth } from "../IniciarSesion/AuthContext";
import { useNavigate } from "react-router-dom";

function HistorialCompras() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/IniciarSesion");
      return;
    }

    const fetchHistorial = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        // Usamos el correo del usuario para obtener sus órdenes
        const correo = encodeURIComponent(currentUser.correo);
        const res = await fetch(
          `http://localhost:8080/api/orden/usuario?correo=${correo}`,
          { headers }
        );
        if (!res.ok) {
          throw new Error("No se pudo obtener el historial de compras");
        }
        const data = await res.json();
        setOrdenes(data);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

    fetchHistorial();
  }, [currentUser, navigate]);

  return (
    <div className="container mt-4">
      <h2>Historial de Compras</h2>
      {ordenes.length === 0 ? (
        <p>No se encontraron compras.</p>
      ) : (
        ordenes.map((orden) => (
          <div key={orden.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Orden #{orden.id}</h5>
              <p className="card-text">
                <strong>Fecha:</strong> {orden.fecha} <br />
                <strong>Total (con IVA):</strong> ${" "}
                {new Intl.NumberFormat("es-CL").format(orden.total)}
              </p>

              <h6>Productos</h6>
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
                  {orden.detalles.map((d, i) => (
                    <tr key={i}>
                      <td>{d.nombreProducto}</td>
                      <td>{d.cantidad}</td>
                      <td>
                        $
                        {new Intl.NumberFormat("es-CL").format(
                          d.precioUnitario
                        )}
                      </td>
                      <td>
                        ${new Intl.NumberFormat("es-CL").format(d.subTotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default HistorialCompras;
