import "./AdmNav.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../IniciarSesion/AuthContext";

export function LogoHomeAdm() {
  return (
    <>
      <div className="">
        <Link className="logoPosition" to="/Home">
          <img className="logoHome" src="/Logo3.png" alt="MundoGolosin Logo" />
        </Link>
        <p className="logoText mt-2">
          <h5>MundoGolosín</h5>
        </p>
      </div>
    </>
  );
}

function AdmNav() {
  const { currentUser, logout } = useAuth();

  return (
    <>
      <aside className="sidebar d-flex flex-column h-100">
        <ul className="nav flex-column flex-grow-1">
          <li className="nav-item texto-nav">
            <Link className="nav-link" to="/Ordenes">
              Ordenes
            </Link>
          </li>
          <li className="nav-item texto-nav">
            <Link className="nav-link" to="/AdmProductos">
              Productos
            </Link>
          </li>
          <li className="nav-item texto-nav">
            <Link className="nav-link" to="/Usuarios">
              Usuarios
            </Link>
          </li>
          <li className="nav-item texto-nav">
            <Link className="nav-link" to="/Usuarios" onClick={logout}>
              Cerrar Sesión
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default AdmNav;
