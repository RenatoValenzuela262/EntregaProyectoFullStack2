import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (correo, contrasenia) => {
    const loginRequest = { correo, contrasenia };

    const response = await fetch("http://localhost:8080/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Credenciales inválidas");
    }

    const user = await response.json();
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);

    if (user.tipo === "ADMIN") {
      navigate("/admin/usuarios"); // Redirige al admin a la vista de usuarios
    } else {
      navigate("/Productos"); // Redirige al cliente a la tienda
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    navigate("/IniciarSesion");
  };

  // --- NUEVO ---
  // Creamos un valor 'isAdmin' para que sea fácil de consultar
  const isAdmin = currentUser?.tipo === "ADMIN";

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, isLoading, isAdmin }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
