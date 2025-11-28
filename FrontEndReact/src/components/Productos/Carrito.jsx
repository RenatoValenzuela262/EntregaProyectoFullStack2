import { useCart } from "./CartContext";
import { useAuth } from "../IniciarSesion/AuthContext";
import "./Carrito.css";

function Carrito() {
  const { cartItems, removeFromCart, addToCart, decreaseQuantity } = useCart();
  const { currentUser } = useAuth();

  const total = cartItems.reduce(
    (acc, item) => acc + item.precio * item.quantity,
    0
  );

  const IVA_RATE = 0.19; // 19% IVA
  const formatter = new Intl.NumberFormat("es-CL");

  const procederAlPago = async () => {
    if (!currentUser) {
      alert("Debes iniciar sesión para proceder al pago");
      return;
    }

    if (cartItems.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    try {
      const subtotal = total;
      const iva = +(subtotal * IVA_RATE).toFixed(0);
      const totalConIVA = subtotal + iva;

      const detallesTexto = cartItems
        .map(
          (item, idx) =>
            `${idx + 1}. ${item.nombre} — ${
              item.quantity
            } x $${formatter.format(item.precio)} = $${formatter.format(
              item.precio * item.quantity
            )}`
        )
        .join("\n");

      const mensaje = `Resumen de la compra:\n\n${detallesTexto}\n\nSubtotal: $${formatter.format(
        subtotal
      )}\nIVA (${Math.round(IVA_RATE * 100)}%): $${formatter.format(
        iva
      )}\nTotal a pagar: $${formatter.format(
        totalConIVA
      )}\n\n¿Deseas confirmar el pago?`;

      const confirmado = window.confirm(mensaje);
      if (!confirmado) return;

      const ordenRequest = {
        nombreCliente: currentUser.nombreCompleto,
        detalles: cartItems.map((item) => ({
          nombreProducto: item.nombre,
          cantidad: item.quantity,
          precioUnitario: item.precio,
          subtotal: item.precio * item.quantity,
        })),
        subtotal,
        iva,
        total: totalConIVA,
      };

      const response = await fetch(
        "http://localhost:8080/api/orden/desde-carrito",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ordenRequest),
        }
      );

      if (response.ok) {
        const ordenCreada = await response.json();
        alert(
          `¡Orden creada exitosamente! Número de orden: ${
            ordenCreada.id
          }\nTotal pagado: $${formatter.format(totalConIVA)}`
        );

        // Limpiar carrito
        // Hacemos una copia para evitar mutaciones mientras iteramos
        const itemsCopy = [...cartItems];
        itemsCopy.forEach((item) => removeFromCart(item.id));

        // Redirigir a página de confirmación o home
        window.location.href = "/Home";
      } else {
        const error = await response.text();
        alert("Error al crear la orden: " + error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Carrito de Compras</h2>

      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <table className="table tabla-carrito">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>${new Intl.NumberFormat("es-CL").format(item.precio)}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    $
                    {new Intl.NumberFormat("es-CL").format(
                      item.precio * item.quantity
                    )}
                  </td>
                  <td>
                    <button
                      className="btn boton-eliminar btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <hr />

          {(() => {
            const subtotal = total;
            const iva = +(subtotal * IVA_RATE).toFixed(0);
            const totalConIVA = subtotal + iva;
            return (
              <div className="text-end resumen-totales">
                <p>
                  <strong>Subtotal:</strong> ${formatter.format(subtotal)}
                </p>
                <p>
                  <strong>IVA ({Math.round(IVA_RATE * 100)}%):</strong> $
                  {formatter.format(iva)}
                </p>
                <h3>
                  <strong>Total:</strong> ${formatter.format(totalConIVA)}
                </h3>
                <button className="btn boton-pagar" onClick={procederAlPago}>
                  Proceder al Pago
                </button>
              </div>
            );
          })()}
        </>
      )}
    </div>
  );
}

export default Carrito;
