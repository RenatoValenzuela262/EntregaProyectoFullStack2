import { Outlet } from "react-router-dom";
import Nav, { LogoHome, Footer } from "./Nav";

// Este componente envuelve toda la parte pública
export function Layout() {
  return (
    <>
      <LogoHome />
      <Nav />
      <main className="container my-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
