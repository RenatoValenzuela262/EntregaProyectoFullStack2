import { useState } from "react";
import "./Registrarse.css";
import validarCorreo from "../../utils/Validaciones";

function Registrarse() {
  const [userData, setUserData] = useState({
    nombreCompleto: "",
    correo: "",
    contrasenia: "",
    confirmarContrasenia: "",
    region: "",
    comuna: "",
    telefono: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.nombreCompleto.length > 100) {
      alert("El nombre no puede superar los 100 caracteres");
      return;
    }

    if (userData.correo.length > 100) {
      alert("El correo no puede superar los 100 caracteres");
      return;
    }

    if (!validarCorreo(userData.correo)) {
      alert("El correo debe ser @duocuc.cl, @profesor.duoc.cl o @gmail.com");
      return;
    }

    if (userData.contrasenia !== userData.confirmarContrasenia) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (userData.contrasenia.length < 4 || userData.contrasenia.length > 10) {
      alert("La contraseña debe tener entre 4 a 10 caracteres");
      return;
    }

    const usuario = {
      nombreCompleto: userData.nombreCompleto,
      correo: userData.correo,
      contrasenia: userData.contrasenia,
      region: userData.region,
      comuna: userData.comuna,
      telefono: userData.telefono,
      estado: true,
      tipo: "Cliente",
    };

    try {
      // 1. Llama a 'fetch' con la URL y las opciones
      const response = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST", // Tienes que especificar el método
        headers: {
          // Tienes que decirle a Spring Boot que estás enviando JSON
          "Content-Type": "application/json",
        },
        // Tienes que convertir tu objeto a un string JSON
        body: JSON.stringify(usuario),
      });

      // 2. 'fetch' no da error por 404 o 500, debes comprobarlo tú
      if (!response.ok) {
        // Intentamos leer el cuerpo del error que envía Spring Boot
        const errorData = await response.json();
        throw new Error(errorData.message || "Error del servidor");
      }

      // 3. Si todo salió bien (response.ok es true)
      const data = await response.json(); // Obtienes la respuesta (ej: "Usuario registrado")
      console.log("Respuesta de Spring Boot:", data);
      alert("¡Usuario registrado con éxito!");
    } catch (error) {
      // Este 'catch' atrapa errores de red o el error que "lanzamos" arriba
      console.error("Error al registrar:", error);
      alert("Error al registrar: " + error.message);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-6">
              <label htmlFor="name-input" className="form-label">
                {"Nombre Completo"}
              </label>
              <input
                type="text"
                className="form-control"
                id="name-input"
                required
                name="nombreCompleto"
                value={userData.nombreCompleto}
                onChange={handleChange}
              ></input>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-6">
              <label htmlFor="email-input" className="form-label">
                {"Email"}
              </label>
              <input
                type="email"
                className="form-control"
                id="email-input"
                required
                name="correo"
                value={userData.correo}
                onChange={handleChange}
              ></input>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-3">
              <label htmlFor="password-input" className="form-label">
                {"Contraseña"}
              </label>
              <input
                type="password"
                className="form-control"
                id="password-input"
                required
                name="contrasenia"
                value={userData.contrasenia}
                onChange={handleChange}
              ></input>
            </div>
            <div className="col-3">
              <label htmlFor="Confpassword-input" className="form-label">
                {"Confirmar Contraseña"}
              </label>
              <input
                type="password"
                className="form-control"
                id="Confpassword-input"
                required
                name="confirmarContrasenia"
                value={userData.confirmarContrasenia}
                onChange={handleChange}
              ></input>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-3">
              <label htmlFor="select-region">Selecciona tu región:</label>
              <select
                id="select-region"
                className="form-select"
                required
                name="region"
                value={userData.region}
                onChange={handleChange}
              >
                <option value="">-- Elige una región --</option>
                <option value="metropolitana">Metropolitana de Santiago</option>
              </select>
            </div>
            <div className="col-3">
              <label htmlFor="select-comunas">Selecciona tu comuna:</label>
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
          </div>

          <div className="row justify-content-center">
            <div className="col-6">
              <label htmlFor="phone-input" className="form-label">
                {"Télefono"}
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone-input"
                required
                name="telefono"
                value={userData.telefono}
                onChange={handleChange}
              ></input>
            </div>
          </div>

          <div className="row mt-3 justify-content-center">
            <div className="col-6">
              <button type="submit" className="btn boton-registro">
                Registrarse
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Registrarse;
