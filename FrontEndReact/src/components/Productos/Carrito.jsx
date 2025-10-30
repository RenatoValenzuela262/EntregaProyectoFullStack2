import { useCart } from "./CartContext";
import "./Carrito.css";

function Carrito() {
  const { cartItems, removeFromCart, addToCart, decreaseQuantity } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.precio * item.quantity,
    0
  );

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

          <div className="text-end">
            <h3>Total: ${new Intl.NumberFormat("es-CL").format(total)}</h3>
            <button className="btn boton-pagar">Proceder al Pago</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;
