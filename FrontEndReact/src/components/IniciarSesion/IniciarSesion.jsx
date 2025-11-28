import { useState } from "react";
import { useAuth } from "./AuthContext";
import "./IniciarSesion.css";

function IniciarSesion() {
  const { login } = useAuth();

  // Usamos tu lógica preferida de un solo estado
  const [loginData, setLoginData] = useState({
    correo: "",
    contrasenia: "",
  });

  // Y tu manejador de cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // El handleSubmit usa nuestra lógica de 'AuthContext'
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1) Pedimos el token JWT
      const authResponse = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: loginData.correo,
          contrasenia: loginData.contrasenia,
        }),
      });

      if (!authResponse.ok) {
        const err = await authResponse.text();
        alert(`Error al autenticar: ${err}`);
        return;
      }

      const authData = await authResponse.json();
      const token = authData.jwtToken || authData.token || null;
      if (token) {
        localStorage.setItem("token", token);
      }

      // 2) Obtenemos el usuario (datos) usando el endpoint existente
      const response = await fetch("http://localhost:8080/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: loginData.correo,
          contrasenia: loginData.contrasenia,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        // Guardamos el usuario en el contexto (el token ya está en localStorage)
        login(userData);
      } else {
        const errorMessage = await response.text();
        alert(`Error al iniciar sesión: ${errorMessage}`);
      }
    } catch (error) {
      alert(`Error al conectar con el servidor: ${error.message}`);
    }
  };

  // Aquí usamos tu diseño preferido (sin 'card')
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
