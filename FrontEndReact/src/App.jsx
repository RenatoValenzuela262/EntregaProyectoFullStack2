import { Routes, Route } from "react-router-dom";

// Importaciones de Layouts
import { Layout } from "./components/Nav/Layout";
import AdmLayout from "./components/Admin/Nav/AdmLayout";

// Importaciones de Páginas Públicas
import Home from "./components/Home/Home";
import Productos from "./components/Productos/Productos";
import Contactanos from "./components/Otros/Contactanos";
import SobreNosotros from "./components/Otros/SobreNosotros";
import IniciarSesion from "./components/IniciarSesion/IniciarSesion";
import Registrarse from "./components/Registrarse/Registrarse";
import Carrito from "./components/Productos/Carrito";

// Importaciones de Admin y Seguridad
import AdminProtectedRoute from "./components/IniciarSesion/AdminProtectedRoute";
import AdmProductos from "./components/Admin/AdmProductos/AdmProductos";
import Usuarios from "./components/Admin/Usuarios/Usuarios";
// (Asumo que también tienes una vista para Ordenes)
// import Ordenes from "./components/Admin/Ordenes";

function App() {
  return (
    <Routes>
      {/* --- Rutas Públicas (usan el Layout principal) --- */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="Home" element={<Home />} />
        <Route path="Productos" element={<Productos />} />
        <Route path="Contactanos" element={<Contactanos />} />
        <Route path="SobreNosotros" element={<SobreNosotros />} />
        <Route path="IniciarSesion" element={<IniciarSesion />} />
        <Route path="Registrarse" element={<Registrarse />} />
        <Route path="Carrito" element={<Carrito />} />
      </Route>

      {/* --- Rutas de Administrador (protegidas y con su propio layout) --- */}
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdmLayout />
          </AdminProtectedRoute>
        }
      >
        <Route path="productos" element={<AdmProductos />} />
        <Route path="usuarios" element={<Usuarios />} />
        {/* <Route path="ordenes" element={<Ordenes />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
