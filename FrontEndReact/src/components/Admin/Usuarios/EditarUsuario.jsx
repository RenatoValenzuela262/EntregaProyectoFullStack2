import { useState, useEffect } from "react";
import "./Usuarios.css";

function EditarUsuario({ usuario, onUsuarioEditado, onCancelar }) {
  const [userData, setUserData] = useState({
    nombreCompleto: "",
    correo: "",
    region: "",
    comuna: "",
    telefono: "",
    estado: true,
    tipo: "CLIENTE", // Añadido el campo 'tipo'
  });

  const [contrasenia, setContrasenia] = useState("");
  const [confirmarContrasenia, setConfirmarContrasenia] = useState("");

  useEffect(() => {
    if (usuario) {
      setUserData({
        nombreCompleto: usuario.nombreCompleto,
        correo: usuario.correo,
        region: usuario.region,
        comuna: usuario.comuna,
        telefono: usuario.telefono,
        estado: usuario.estado,
        tipo: usuario.tipo, // Añadido el campo 'tipo'
      });
      setContrasenia("");
      setConfirmarContrasenia("");
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "estado") {
      setUserData((prevData) => ({ ...prevData, estado: value === "true" }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.comuna === "") {
      alert("Debes seleccionar una comuna");
      return;
    }

    const usuarioActualizado = {
      nombreCompleto: userData.nombreCompleto,
      correo: userData.correo,
      region: userData.region,
      comuna: userData.comuna,
      telefono: userData.telefono,
      estado: userData.estado,
      tipo: userData.tipo, // Añadido el campo 'tipo'
    };

    if (contrasenia !== "") {
      if (contrasenia !== confirmarContrasenia) {
        alert("Las nuevas contraseñas no coinciden");
        return;
      }
      if (contrasenia.length < 4 || contrasenia.length > 10) {
        alert("La nueva contraseña debe tener entre 4 a 10 caracteres");
        return;
      }
      usuarioActualizado.contrasenia = contrasenia;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/usuarios/${usuario.idUsuario}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuarioActualizado),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el usuario");
      }

      alert("¡Usuario actualizado con éxito!");
      onUsuarioEditado();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name-input" className="form-label">
          Nombre Completo
        </label>
        <input
          type="text"
          className="form-control"
          id="name-input"
          required
          name="nombreCompleto"
          value={userData.nombreCompleto}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email-input" className="form-label">
          Correo (no se puede modificar)
        </label>
        <input
          type="email"
          className="form-control"
          id="email-input"
          readOnly
          disabled
          name="correo"
          value={userData.correo}
        />
      </div>

      <hr />
      <p className="form-text">
        Dejar en blanco para no modificar la contraseña.
      </p>

      <div className="mb-3">
        <label htmlFor="password-input" className="form-label">
          Nueva Contraseña
        </label>
        <input
          type="password"
          className="form-control"
          id="password-input"
          name="contrasenia"
          value={contrasenia}
          onChange={(e) => setContrasenia(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="Confpassword-input" className="form-label">
          Confirmar Nueva Contraseña
        </label>
        <input
          type="password"
          className="form-control"
          id="Confpassword-input"
          name="confirmarContrasenia"
          value={confirmarContrasenia}
          onChange={(e) => setConfirmarContrasenia(e.target.value)}
        />
      </div>
      <hr />

      <div className="mb-3">
        <label htmlFor="select-region" className="form-label">
          Región:
        </label>
        <select
          id="select-region"
          className="form-select"
          required
          name="region"
          value={userData.region}
          onChange={handleChange}
        >
          <option value="metropolitana">Metropolitana de Santiago</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="select-comunas" className="form-label">
          Comuna:
        </label>
        <select
          id="select-comunas"
          className="form-select"
          required
          name="comuna"
          value={userData.comuna}
          onChange={handleChange}
        >
          <option value="">-- Elige una comuna --</option>
          <option value="cerrillos">Cerrillos</option>
          <option value="cerro-navia">Cerro Navia</option>
          <option value="conchali">Conchalí</option>
          <option value="el-bosque">El Bosque</option>
          <option value="estacion-central">Estación Central</option>
          <option value="huechuraba">Huechuraba</option>
          <option value="independencia">Independencia</option>
          <option value="la-cisterna">La Cisterna</option>
          <option value="la-florida">La Florida</option>
          <option value="la-granja">La Granja</option>
          <option value="la-pintana">La Pintana</option>
          <option value="la-reina">La Reina</option>
          <option value="las-condes">Las Condes</option>
          <option value="lo-barnechea">Lo Barnechea</option>
          <option value="lo-espejo">Lo Espejo</option>
          <option value="lo-prado">Lo Prado</option>
          <option value="macul">Macul</option>
          <option value="maipu">Maipú</option>
          <option value="nunoa">Ñuñoa</option>
          <option value="pedro-aguirre-cerda">Pedro Aguirre Cerda</option>
          <option value="penalolen">Peñalolén</option>
          <option value="providencia">Providencia</option>
          <option value="pudahuel">Pudahuel</option>
          <option value="quilicura">Quilicura</option>
          <option value="quinta-normal">Quinta Normal</option>
          <option value="recoleta">Recoleta</option>
          <option value="renca">Renca</option>
          <option value="san-joaquin">San Joaquín</option>
          <option value="san-miguel">San Miguel</option>
          <option value="san-ramon">San Ramón</option>
          <option value="santiago">Santiago</option>
          <option value="vitacura">Vitacura</option>
          <option value="puente-alto">Puente Alto</option>
          <option value="pirque">Pirque</option>
          <option value="san-jose-de-maipo">San José de Maipo</option>
          <option value="colina">Colina</option>
          <option value="lampa">Lampa</option>
          <option value="tiltil">Tiltil</option>
          <option value="san-bernardo">San Bernardo</option>
          <option value="buin">Buin</option>
          <option value="calera-de-tango">Calera de Tango</option>
          <option value="paine">Paine</option>
          <option value="melipilla">Melipilla</option>
          <option value="alhue">Alhué</option>
          <option value="curacavi">Curacaví</option>
          <option value="maria-pinto">María Pinto</option>
          <option value="san-pedro">San Pedro</option>
          <option value="talagante">Talagante</option>
          <option value="el-monte">El Monte</option>
          <option value="isla-de-maipo">Isla de Maipo</option>
          <option value="padre-hurtado">Padre Hurtado</option>
          <option value="penaflor">Peñaflor</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="phone-input" className="form-label">
          Teléfono
        </label>
        <input
          type="tel"
          className="form-control"
          id="phone-input"
          required
          name="telefono"
          value={userData.telefono}
          onChange={handleChange}
        />
      </div>

      {/* --- CAMPO AÑADIDO: TIPO --- */}
      <div className="mb-3">
        <label htmlFor="select-tipo" className="form-label">
          Tipo de Usuario:
        </label>
        <select
          id="select-tipo"
          className="form-select"
          required
          name="tipo"
          value={userData.tipo}
          onChange={handleChange}
        >
          <option value="CLIENTE">Cliente</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="select-estado" className="form-label">
          Estado:
        </label>
        <select
          id="select-estado"
          className="form-select"
          required
          name="estado"
          value={userData.estado}
          onChange={handleChange}
        >
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </div>

      <div className="d-flex justify-content-end">
        <button
          type="button"
          onClick={onCancelar}
          className="btn boton-cancelar me-2"
        >
          Cancelar
        </button>
        <button type="submit" className="btn color-boton">
          Guardar Cambios
        </button>
      </div>
    </form>
  );
}

export default EditarUsuario;
