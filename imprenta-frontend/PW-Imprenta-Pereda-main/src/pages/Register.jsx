import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    correo: "",
    contraseña: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cliente = {
      nombre: form.nombre,
      apellido: form.empresa,
      telefono: "000000000",  // Puedes pedirlo más adelante
      correo: form.correo,
      contraseña: form.contraseña,
      rol: "cliente"
    };

    try {
      const res = await fetch("http://localhost:8081/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente)
      });

      if (!res.ok) throw new Error("Error al registrar cliente");
      alert("✅ Cliente registrado con éxito");
      setForm({ nombre: "", empresa: "", correo: "", contraseña: "" });
    } catch (err) {
      alert("❌ Error al registrar cliente");
      console.error(err);
    }
  };

  return (
    <div className="h-screen bg-[var(--blue-main)] text-white flex">
      <div className=" max-w-96 m-auto flex flex-col items-center space-y-6">
        <h1 className=" capitalize font-bold text-4xl text-center mb-6">Regístrate</h1>
        <div className="bg-[var(--gray-main)] p-4 rounded-xl w-[360px] shadow-2xl">
          <form className=" space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-1">
              <label htmlFor="nombre" className="text-[var(--blue-main)] font-bold">Nombre</label>
              <input type="text" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} className="border-2 bg-white rounded-lg p-1 text-black outline-none" required />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="empresa" className="text-[var(--blue-main)] font-bold">Empresa</label>
              <input type="text" id="empresa" name="empresa" value={form.empresa} onChange={handleChange} className="border-2 bg-white rounded-lg p-1 text-black outline-none" required />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="correo" className="text-[var(--blue-main)] font-bold">Correo Electrónico</label>
              <input type="email" id="correo" name="correo" value={form.correo} onChange={handleChange} className="border-2 bg-white rounded-lg p-1 text-black outline-none" required />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="contrasena" className="text-[var(--blue-main)] font-bold">Contraseña</label>
              <input type="password" id="contraseña" name="contraseña" value={form.contraseña} onChange={handleChange} className="border-2 bg-white rounded-lg p-1 text-black outline-none" required />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="uppercase bg-[var(--orange-main)] rounded-xl py-2 px-4">Registrar</button>
            </div>
          </form>
        </div>
        <Link to="/iniciar-sesion">
          ¿Ya tienes cuenta? <span className="underline">Inicia Sesión</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
