import { useEffect, useState } from "react";

const AdminCorrections = () => {
  const [correcciones, setCorrecciones] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/correcciones")
      .then((res) => res.json())
      .then((data) => setCorrecciones(data))
      .catch((err) => console.error("Error al cargar correcciones", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[var(--blue-main)] mb-4">Correcciones de Pedido</h1>

      {correcciones.length === 0 ? (
        <p>No hay correcciones registradas.</p>
      ) : (
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Pedido</th>
              <th className="border p-2">Cliente</th>
              <th className="border p-2">Motivo</th>
              <th className="border p-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {correcciones.map((c) => (
              <tr key={c.id}>
                <td className="border p-2">{c.id}</td>
                <td className="border p-2">#{c.pedido?.id}</td>
                <td className="border p-2">{c.pedido?.cliente?.nombre}</td>
                <td className="border p-2">{c.descripcion}</td>
                <td className="border p-2">{c.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminCorrections;
