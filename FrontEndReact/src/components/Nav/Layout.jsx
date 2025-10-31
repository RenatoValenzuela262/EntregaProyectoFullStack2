import Nav, { LogoHome, Footer } from "./Nav";
import "./Nav.css";

function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="layout d-flex justify-content-center py-3">
        <LogoHome />
      </header>
      <nav className="layout d-flex justify-content-center py-2">
        <Nav />
      </nav>
      <main className="container flex-grow-1 my-4">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
