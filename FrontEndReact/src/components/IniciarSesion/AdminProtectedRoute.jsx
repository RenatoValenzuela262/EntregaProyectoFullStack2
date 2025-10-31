import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function AdminProtectedRoute() {
  const { isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/IniciarSesion" replace />;
  }

  return <Outlet />;
}

export default AdminProtectedRoute;
