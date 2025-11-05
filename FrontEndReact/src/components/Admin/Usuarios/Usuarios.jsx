import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useAuth } from "../../IniciarSesion/AuthContext";
import CrearUsuario from "./CrearUsuario";
import EditarUsuario from "./EditarUsuario";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  // ← Obtener las funciones de permisos del contexto
  const { currentUser, puedeEditarUsuario, puedeEliminarUsuario } = useAuth();

  const fetchUsuarios = async () => {
    try {
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

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleCerrarModal = () => setShowModal(false);
  const handleAbrirModal = () => setShowModal(true);
  const handleUsuarioCreado = () => {
    handleCerrarModal();
    fetchUsuarios();
  };

  const handleCerrarEditModal = () => {
    setShowEditModal(false);
    setUsuarioSeleccionado(null);
  };

  const handleAbrirEditModal = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setShowEditModal(true);
  };

  const handleUsuarioEditado = () => {
    handleCerrarEditModal();
    fetchUsuarios();
  };

  const handleEliminar = async (id, usuario) => {
    if (!puedeEliminarUsuario(usuario)) {
      alert("No tienes permisos para eliminar este usuario");
      return;
    }

    if (
      !window.confirm("¿Estás seguro de que quieres eliminar este usuario?")
    ) {
      return;
    }

    try {
      // ← Enviar el usuario logueado en los headers
      const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          "Usuario-Logueado": JSON.stringify(currentUser), // ← Agregar este header
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el usuario");
      }

      alert("¡Usuario eliminado con éxito!");
      fetchUsuarios();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Gestión de Usuarios</h2>

      <button
        onClick={handleAbrirModal}
        className="btn btn-primary mb-3 color-boton"
      >
        Crear Usuario
      </button>

      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Correo</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => {
            // --- NUEVA LÓGICA DE PERMISOS ---
            const puedeEditar = puedeEditarUsuario(usuario);
            const puedeEliminar = puedeEliminarUsuario(usuario);

            return (
              <tr key={usuario.idUsuario}>
                <td>{usuario.idUsuario}</td>
                <td>{usuario.nombreCompleto}</td>
                <td>{usuario.correo}</td>
                <td>
                  <span
                    className={`badge ${
                      usuario.tipo === "ADMIN+"
                        ? "bg-danger"
                        : usuario.tipo === "ADMIN"
                        ? "bg-warning"
                        : "bg-primary"
                    }`}
                  >
                    {usuario.tipo}
                  </span>
                </td>
                <td>{usuario.estado ? "Activo" : "Inactivo"}</td>
                <td>
                  <div className="btn-group w-100" role="group">
                    <button
                      className="btn boton-modificar btn-sm"
                      onClick={() => handleAbrirEditModal(usuario)}
                      disabled={!puedeEditar}
                      title={
                        !puedeEditar
                          ? "No tienes permisos para editar este usuario"
                          : ""
                      }
                    >
                      Modificar
                    </button>
                    <button
                      className="btn boton-eliminar btn-sm"
                      onClick={() => handleEliminar(usuario.idUsuario, usuario)}
                      disabled={!puedeEliminar}
                      title={
                        !puedeEliminar
                          ? "No tienes permisos para eliminar este usuario"
                          : ""
                      }
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CrearUsuario
            onUsuarioCreado={handleUsuarioCreado}
            onCancelar={handleCerrarModal}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={handleCerrarEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {usuarioSeleccionado && (
            <EditarUsuario
              usuario={usuarioSeleccionado}
              onUsuarioEditado={handleUsuarioEditado}
              onCancelar={handleCerrarEditModal}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Usuarios;
