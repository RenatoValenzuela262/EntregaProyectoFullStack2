import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // --- CAMBIO 1: Renombramos 'user' a 'currentUser' ---
  const [currentUser, setCurrentUser] = useState(null);

  // Añadimos un estado de carga para evitar "parpadeos"
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // Este useEffect lee el localStorage SOLO una vez al cargar la app
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    // Usamos 'currentUser' para guardar
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setCurrentUser(userData);

    // Redirigimos según el tipo de usuario
    if (userData.tipo === "ADMIN") {
      navigate("/admin/usuarios");
    } else {
      navigate("/Home");
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/IniciarSesion");
  };

  // --- CAMBIO 2: Añadimos 'isAdmin' (que Nav.jsx necesita) ---
  const isAdmin = currentUser?.tipo === "ADMIN";

  // No renderizamos la app hasta que sepamos si hay un usuario logueado
  if (isLoading) {
    return null; // O un <Spinner />
  }

  return (
    // --- CAMBIO 3: Pasamos 'currentUser' y 'isAdmin' en el value ---
    <AuthContext.Provider value={{ currentUser, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
