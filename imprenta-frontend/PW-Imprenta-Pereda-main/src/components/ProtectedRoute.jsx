import React from "react";
import { Navigate } from "react-router-dom";

// Este componente protege rutas privadas
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Si no está logueado, lo mandamos al login
  if (!isLoggedIn) {
    alert("⚠️ Debes iniciar sesión primero");
    return <Navigate to = "/iniciar-sesion" replace />;
  }

  // Si sí está logueado, se muestra el contenido normal
  return children;
};

export default ProtectedRoute;
