import { useState, useEffect } from "react";
// --- CAMBIO 1: Quitamos 'Table' de la importación ---
import { Modal } from "react-bootstrap";
// Importamos tu componente de formulario
import CrearUsuario from "./CrearUsuario";

import "./Usuarios.css";

// El nombre de la función coincide con el nombre del archivo
function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // --- 1. FUNCIÓN PARA OBTENER LOS USUARIOS (READ del CRUD) ---
  const fetchUsuarios = async () => {
    try {
      // Usamos el endpoint GET de tu controlador de usuarios
      const response = await fetch("http://localhost:8080/api/usuarios");
      if (!response.ok) {
        throw new Error("No se pudieron cargar los usuarios");
      }
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // --- 2. USEEFFECT PARA CARGAR LOS USUARIOS AL INICIO ---
  useEffect(() => {
    fetchUsuarios();
  }, []);

  // --- 3. FUNCIONES PARA CONTROLAR EL MODAL (POP-UP) ---
  const handleCerrarModal = () => setShowModal(false);
  const handleAbrirModal = () => setShowModal(true);

  // --- 4. FUNCIÓN PARA ACTUALIZAR LA TABLA ---
  const handleUsuarioCreado = () => {
    handleCerrarModal(); // Cierra el modal
    fetchUsuarios(); // Vuelve a cargar la lista de usuarios (para ver el nuevo)
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Gestión de Usuarios</h2>

      {/* Botón que abre el pop-up 
          (Nota: Quité el prop 'variant' porque no es HTML
           y lo reemplacé con la clase 'btn-primary' 
           para que se vea igual) 
      */}
      <button
        onClick={handleAbrirModal}
        className="btn btn-primary mb-3 color-boton" // <-- CAMBIO 2
      >
        Crear Usuario
      </button>

      {/* --- CAMBIO 3: Tabla de Bootstrap normal ---
          Cambiamos <Table striped bordered hover> 
          por <table className="table table-striped table-bordered table-hover"> 
      */}
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Correo</th>
            <th>Región</th>
            <th>Comuna</th>
            <th>Teléfono</th>
            <th>Estado</th>
            {/* Omitimos la contraseña por seguridad */}
          </tr>
        </thead>
        <tbody>
          {/* Mapeamos la lista de usuarios a filas de la tabla */}
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombreCompleto}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.region}</td>
              <td>{usuario.comuna}</td>
              <td>{usuario.telefono}</td>
              {/* Usamos un ternario para mostrar "Activo" o "Inactivo" */}
              <td>{usuario.estado ? "Activo" : "Inactivo"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* --- Fin del cambio de la tabla --- */}

      {/* --- EL MODAL (POP-UP) - Se queda igual --- */}
      <Modal show={showModal} onHide={handleCerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Aquí cargamos tu componente de formulario */}
          <CrearUsuario
            onUsuarioCreado={handleUsuarioCreado}
            onCancelar={handleCerrarModal}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Usuarios;
