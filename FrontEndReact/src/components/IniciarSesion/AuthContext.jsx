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

  const login = (userData) => {
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setCurrentUser(userData);

    // --- CORRECCIÓN AQUÍ ---
    // Redirigimos si es ADMIN o ADMIN+
    if (userData.tipo === "ADMIN" || userData.tipo === "ADMIN+") {
      navigate("/admin/usuarios"); // O la ruta de admin que prefieras
    } else {
      navigate("/Home");
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/IniciarSesion");
  };

  // --- CORRECCIÓN AQUÍ ---
  // Hacemos que 'isAdmin' sea verdad para ambos roles de admin
  const isAdmin =
    currentUser?.tipo === "ADMIN" || currentUser?.tipo === "ADMIN+";

  if (isLoading) {
    return null;
  }

  return (
    // Pasamos el 'isAdmin' corregido que tu Nav.jsx necesita
    <AuthContext.Provider value={{ currentUser, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
