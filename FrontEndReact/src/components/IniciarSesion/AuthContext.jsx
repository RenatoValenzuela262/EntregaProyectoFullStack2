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

    if (userData.tipo === "ADMIN" || userData.tipo === "ADMIN+") {
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

  // --- FUNCIONES DE PERMISOS ---
  const hasPermission = (requiredType) => {
    if (!currentUser) return false;

    const userType = currentUser.tipo;

    // Jerarquía de permisos
    const permissions = {
      CLIENTE: ["CLIENTE"],
      ADMIN: ["CLIENTE", "ADMIN"],
      "ADMIN+": ["CLIENTE", "ADMIN", "ADMIN+"],
    };

    return permissions[userType]?.includes(requiredType) || false;
  };

  const puedeEditarUsuario = (usuarioTarget) => {
    if (!currentUser) return false;

    // Admin+ puede editar a todos
    if (currentUser.tipo === "ADMIN+") return true;

    // Admin normal solo puede editar Clientes
    if (currentUser.tipo === "ADMIN" && usuarioTarget.tipo === "CLIENTE") {
      return true;
    }

    return false;
  };

  const puedeEliminarUsuario = (usuarioTarget) => {
    if (!currentUser) return false;

    // Nadie puede eliminarse a sí mismo - CORREGIR ESTA LÍNEA
    if (currentUser.idUsuario === usuarioTarget.idUsuario) return false;

    // Admin+ puede eliminar a todos excepto a sí mismo
    if (
      currentUser.tipo === "ADMIN+" &&
      currentUser.idUsuario !== usuarioTarget.idUsuario
    )
      return true;

    // Admin normal solo puede eliminar Clientes
    if (currentUser.tipo === "ADMIN" && usuarioTarget.tipo === "CLIENTE") {
      return true;
    }

    return false;
  };

  const isAdmin =
    currentUser?.tipo === "ADMIN" || currentUser?.tipo === "ADMIN+";
  const isSuperAdmin = currentUser?.tipo === "ADMIN+";

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        isAdmin,
        isSuperAdmin,
        hasPermission,
        puedeEditarUsuario,
        puedeEliminarUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
