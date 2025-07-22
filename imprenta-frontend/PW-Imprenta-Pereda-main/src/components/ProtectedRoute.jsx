import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const rol = localStorage.getItem("rol");

  if (!isLoggedIn || rol !== "admin") {
    alert("⚠️ Debes iniciar sesión como administrador");
    return <Navigate to="/iniciar-sesion" replace />;
  }

  return children;
};

export default ProtectedRoute;
