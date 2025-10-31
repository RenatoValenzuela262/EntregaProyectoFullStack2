import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IniciarSesion.css";
// CAMBIO: La ruta ahora es local
import { useAuth } from "./AuthContext";

function IniciarSesion() {
  const [loginData, setLoginData] = useState({
    correo: "",
    contrasenia: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth(); // Usamos el 'login' del contexto

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginRequest = {
      correo: loginData.correo,
      contrasenia: loginData.contrasenia,
    };

    try {
      const response = await fetch("http://localhost:8080/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginRequest),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Correo o contraseña incorrectos");
      }

      const usuarioLogueado = await response.json();

      // Llamamos a la función login del contexto
      login(usuarioLogueado);

      alert("¡Inicio de sesión exitoso!");
      navigate("/Home"); // Redirige al Home
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión: " + error.message);
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
                name="correo"
                value={loginData.correo}
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
                name="contrasenia"
                value={loginData.contrasenia}
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
