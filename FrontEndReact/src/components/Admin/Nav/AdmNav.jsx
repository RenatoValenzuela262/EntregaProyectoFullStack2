import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../IniciarSesion/AuthContext";
import "./AdmNav.css";

export function LogoHomeAdm() {
  return (
    <div className="cabezera justify-content-center">
      <Link to="/Home">
        <img className="logoHome" src="/Logo3.png" alt="MundoGolosin Logo" />
      </Link>
    </div>
  );
}

function AdmNav() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/IniciarSesion");
  };

  return (
    <nav className="adm-sidebar">
      <h4>Panel de Admin</h4>
      <hr />
      <p>
        Bienvenido,
        <br />
        <strong>{currentUser?.nombreCompleto}</strong>
      </p>
      <hr />
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/admin/productos">
            Adm. Productos
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/usuarios">
            Adm. Usuarios
          </Link>
        </li>
      </ul>
      <hr />
      <button className="btn btn-danger w-100" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </nav>
  );
}

export default AdmNav;
