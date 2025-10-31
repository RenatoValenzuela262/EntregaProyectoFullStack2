import "./index.css";
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

import Ordenes from "./components/Admin/Ordenes";
import AdmProductos from "./components/Admin/AdmProductos/AdmProductos.jsx";
import Usuarios from "./components/Admin/Usuarios/Usuarios.jsx";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Productos" element={<Productos />} />
          <Route path="/Contactanos" element={<Contactanos />} />
          <Route path="/SobreNosotros" element={<SobreNosotros />} />
          <Route path="/IniciarSesion" element={<IniciarSesion />} />
          <Route path="/Registrarse" element={<Registrarse />} />
          <Route path="/Carrito" element={<Carrito />} />
        </Routes>
      </Layout>

      <AdmLayout>
        <Routes>
          <Route path="/Ordenes" element={<Ordenes />} />
          <Route path="/AdmProductos" element={<AdmProductos />} />
          <Route path="/Usuarios" element={<Usuarios />} />
        </Routes>
      </AdmLayout>
    </>
  );
}

export default App;
