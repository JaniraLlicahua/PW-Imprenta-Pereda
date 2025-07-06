import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!correo || !contraseña) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/clientes/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ correo, contraseña })
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        alert("❌ " + errorMsg);
        return;
      }

      const data = await response.json();
      alert("✅ Inicio de sesión exitoso");

      // 🔐 Guardar sesión
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("clienteId", data.clienteId);

      // 🔀 Redirigir según rol
      if (data.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/cliente/seguimiento");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error al intentar iniciar sesión");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[var(--blue-main)] text-white">
      <div className="bg-[var(--gray-main)] p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-[var(--blue-main)] font-bold">Correo</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full p-2 rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-[var(--blue-main)] font-bold">Contraseña</label>
            <input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="w-full p-2 rounded text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--orange-main)] py-2 rounded hover:bg-orange-600"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
