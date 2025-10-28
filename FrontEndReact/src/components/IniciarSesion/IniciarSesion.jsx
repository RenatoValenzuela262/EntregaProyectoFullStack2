import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IniciarSesion.css";

function IniciarSesion() {
  // 1. Estado actualizado
  const [loginData, setLoginData] = useState({
    correo: "",
    contrasenia: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. Objeto actualizado para enviar
    const loginRequest = {
      correo: loginData.correo,
      contrasenia: loginData.contrasenia,
    };

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        // (Revisa tu URL)
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Correo o contraseña incorrectos");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      alert("¡Inicio de sesión exitoso!");
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
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
                name="correo" // <-- 3. Actualizado
                value={loginData.correo} // <-- 4. Actualizado
                onChange={handleChange}
              />
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
                name="contrasenia" // <-- 3. Actualizado
                value={loginData.contrasenia} // <-- 4. Actualizado
                onChange={handleChange}
              />
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
