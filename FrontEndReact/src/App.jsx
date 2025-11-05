import "./index.css";
import { useAuth } from "./components/IniciarSesion/AuthContext";
import Layout from "./components/Nav/Layout";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Productos from "./components/Productos/Productos";
import Contactanos from "./components/Otros/Contactanos";
import SobreNosotros from "./components/Otros/SobreNosotros";
import IniciarSesion from "./components/IniciarSesion/IniciarSesion";
import Registrarse from "./components/Registrarse/Registrarse";
import Carrito from "./components/Productos/Carrito.jsx";

import AdmLayout from "./components/Admin/Nav/AdmLayout.jsx";

import Ordenes from "./components/Admin/Ordenes/Ordenes";
import AdmProductos from "./components/Admin/AdmProductos/AdmProductos.jsx";
import Usuarios from "./components/Admin/Usuarios/Usuarios.jsx";

function App() {
  const { currentUser, isAdmin } = useAuth();

  return (
    <>
      {isAdmin ? (
        <AdmLayout>
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/Productos" element={<Productos />} />
            <Route path="/Contactanos" element={<Contactanos />} />
            <Route path="/SobreNosotros" element={<SobreNosotros />} />
            <Route path="/Carrito" element={<Carrito />} />

            <Route path="/Ordenes" element={<Ordenes />} />
            <Route path="/AdmProductos" element={<AdmProductos />} />
            <Route path="/Usuarios" element={<Usuarios />} />

            <Route path="/IniciarSesion" element={<IniciarSesion />} />
            <Route path="/Registrarse" element={<Registrarse />} />
          </Routes>
        </AdmLayout>
      ) : (
        <Layout>
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/Productos" element={<Productos />} />
            <Route path="/Contactanos" element={<Contactanos />} />
            <Route path="/SobreNosotros" element={<SobreNosotros />} />
            <Route path="/IniciarSesion" element={<IniciarSesion />} />
            <Route path="/Registrarse" element={<Registrarse />} />
            <Route path="/Carrito" element={<Carrito />} />

            <Route path="/Ordenes" element={<Home />} />
            <Route path="/AdmProductos" element={<Home />} />
            <Route path="/Usuarios" element={<Home />} />
          </Routes>
        </Layout>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
