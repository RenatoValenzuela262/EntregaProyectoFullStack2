import "./IniciarSesion.css";

function IniciarSesion() {
  return (
    <>
      <div className="container">
        <form>
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
            <div className="col-6">
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
          </div>

          <div className="row mt-3 justify-content-center">
            <div className="col-6">
              <button type="submit" className="btn boton-registro">
                Iniciar Sesion
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default IniciarSesion;
