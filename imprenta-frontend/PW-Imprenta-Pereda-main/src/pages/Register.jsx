import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dniRuc: "",
    telefono: "",
    direccion: "",
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
      apellido: form.apellido,
      dniRuc: form.dniRuc,
      telefono: form.telefono,
      direccion: form.direccion,
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
      setForm({
        nombre: "",
        apellido: "",
        dniRuc: "",
        telefono: "",
        direccion: "",
        correo: "",
        contraseña: ""
      });
    } catch (err) {
      alert("❌ Error al registrar cliente");
      console.error(err);
    }
  };

  return (
    <div className="h-screen bg-[var(--blue-main)] text-white flex">
      <div className="max-w-96 m-auto flex flex-col items-center space-y-6">
        <h1 className="capitalize font-bold text-4xl text-center mb-6">Regístrate</h1>
        <div className="bg-[var(--gray-main)] p-4 rounded-xl w-[360px] shadow-2xl">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/** Aquí comienzan los inputs */}
            <Input label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} />
            <Input label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} />
            <Input label="DNI o RUC" name="dniRuc" value={form.dniRuc} onChange={handleChange} />
            <Input label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} />
            <Input label="Dirección" name="direccion" value={form.direccion} onChange={handleChange} />
            <Input label="Correo Electrónico" name="correo" type="email" value={form.correo} onChange={handleChange} />
            <Input label="Contraseña" name="contraseña" type="password" value={form.contraseña} onChange={handleChange} />

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

const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div className="flex flex-col space-y-1">
    <label htmlFor={name} className="text-[var(--blue-main)] font-bold">{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="border-2 bg-white rounded-lg p-1 text-black outline-none"
      required
    />
  </div>
);

export default Register;
