import "./Nav.css";
import { Link } from "react-router-dom";
import { useCart } from "../Productos/CartContext";
import { useAuth } from "../IniciarSesion/AuthContext";

export function LogoHome() {
  return (
    <div className="cabezera justify-content-center">
      <Link to="/Home">
        <img className="logoHome" src="/Logo3.png" alt="MundoGolosin Logo" />
      </Link>
    </div>
  );
}

function Nav() {
  const { cartItems } = useCart();
  const { currentUser, logout, isAdmin } = useAuth();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="cabezera">
      <ul className="nav justify-content-center align-items-center">
        <li className="nav-item">
          <Link className="nav-link links-navegacion" to="/Productos">
            Productos
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link links-navegacion" to="/Contactanos">
            Contactanos
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link links-navegacion" to="/SobreNosotros">
            Sobre Nosotros
          </Link>
        </li>

        {/* Eliminé las pestañas de administración */}

        {/* Lógica de Login/Logout */}
        {currentUser ? (
          <>
            <li className="nav-item">
              <span className="nav-link text-dark">
                Hola, {currentUser.nombreCompleto.split(" ")[0]}
              </span>
            </li>
            <li className="nav-item">
              <button
                className="btn nav-link links-navegacion"
                onClick={logout}
              >
                Cerrar Sesión
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link links-navegacion" to="/IniciarSesion">
                Iniciar Sesion
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link links-navegacion" to="/Registrarse">
                Registrarse
              </Link>
            </li>
          </>
        )}

        {/* Ícono del Carrito */}
        <li className="nav-item">
          <Link
            to="/Carrito"
            className="nav-link links-navegacion position-relative"
          >
            <i className="bi bi-cart"></i>{" "}
            {totalItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalItems}
                <span className="visually-hidden">items en el carrito</span>
              </span>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <>
      <footer className="pie">
        <p>© 2025 MundoGolosín. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}

export default Nav;
