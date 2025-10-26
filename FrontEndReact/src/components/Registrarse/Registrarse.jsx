import "./Registrarse.css";

function Registrarse() {
  return (
    <>
      <div className="container">
        <form>
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
              ></input>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-3">
              <label htmlFor="select-region">Selecciona tu región:</label>
              <select id="select-region" className="form-select" required>
                <option value="">-- Elige una región --</option>
                <option value="metropolitana">Metropolitana de Santiago</option>
              </select>
            </div>
            <div className="col-3">
              <label htmlFor="select-comunas">Selecciona tu comuna:</label>
              <select id="select-comunas" className="form-select" required>
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
