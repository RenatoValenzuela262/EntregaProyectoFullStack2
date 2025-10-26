import "./Nav.css";
import { Link } from "react-router-dom";

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
  return (
    <div className="cabezera">
      <ul className="nav justify-content-center">
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
