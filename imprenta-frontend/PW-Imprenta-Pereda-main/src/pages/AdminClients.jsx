import { useState, useEffect } from "react";

const AdminClients = () => {
  const [clientes, setClientes] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(null);
  const [form, setForm] = useState({
    nombre: "", apellido: "", correo: "", direccion: "", telefono: "", dniRuc: ""
  });

  useEffect(() => {
    fetch("http://localhost:8081/api/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error("Error al cargar clientes", err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este cliente?")) return;

    try {
      const res = await fetch(`http://localhost:8081/api/clientes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setClientes(clientes.filter((c) => c.id !== id));
      alert("✅ Cliente eliminado");
    } catch {
      alert("❌ No se pudo eliminar");
    }
  };

  const handleEdit = (cliente) => {
    setModoEdicion(cliente.id);
    setForm(cliente);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:8081/api/clientes/${modoEdicion}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();

      setClientes(clientes.map((c) => (c.id === modoEdicion ? form : c)));
      setModoEdicion(null);
      alert("✅ Cliente actualizado");
    } catch {
      alert("❌ Error al actualizar cliente");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-[var(--blue-main)]">Gestión de Clientes</h1>

      <table className="w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Nombre</th>
            <th>Correo</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>DNI/RUC</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id} className="border">
              {modoEdicion === c.id ? (
                <>
                  <td><input value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} /></td>
                  <td><input value={form.correo} onChange={(e) => setForm({...form, correo: e.target.value})} /></td>
                  <td><input value={form.direccion} onChange={(e) => setForm({...form, direccion: e.target.value})} /></td>
                  <td><input value={form.telefono} onChange={(e) => setForm({...form, telefono: e.target.value})} /></td>
                  <td><input value={form.dniRuc} onChange={(e) => setForm({...form, dniRuc: e.target.value})} /></td>
                  <td>
                    <button onClick={handleSave} className="text-green-600 hover:underline">Guardar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{c.nombre}</td>
                  <td>{c.correo}</td>
                  <td>{c.direccion}</td>
                  <td>{c.telefono}</td>
                  <td>{c.dniRuc}</td>
                  <td className="space-x-2">
                    <button onClick={() => handleEdit(c)} className="text-blue-600 hover:underline">Editar</button>
                    <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:underline">Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminClients;
