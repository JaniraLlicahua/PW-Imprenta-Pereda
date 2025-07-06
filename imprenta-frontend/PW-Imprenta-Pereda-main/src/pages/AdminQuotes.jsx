import { useEffect, useState } from "react";

const AdminQuotes = () => {
  const [cotizaciones, setCotizaciones] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/cotizaciones")
      .then((res) => res.json())
      .then((data) => setCotizaciones(data))
      .catch((err) => console.error("Error cargando cotizaciones:", err));
  }, []);

  const aprobarCotizacion = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/api/cotizaciones/${id}/aprobar`, {
        method: "PUT",
      });

      if (!response.ok) throw new Error("Error al aprobar cotización");

      setCotizaciones((prev) =>
        prev.map((c) => (c.id === id ? { ...c, estado: "Aprobada" } : c))
      );

      alert("✅ Cotización aprobada");
    } catch (error) {
      console.error(error);
      alert("❌ No se pudo aprobar la cotización");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8081/api/cotizaciones/${id}`, {
        method: "DELETE",
      });
      setCotizaciones((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      alert("❌ No se pudo eliminar la cotización");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-[var(--blue-main)]">Cotizaciones Registradas</h1>

      {cotizaciones.length === 0 ? (
        <p className="text-gray-500">No hay cotizaciones registradas.</p>
      ) : (
        <table className="w-full border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Cliente</th>
              <th className="p-2 border">Descripción</th>
              <th className="p-2 border">Precio</th>
              <th className="p-2 border">Estado</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cotizaciones.map((c) => (
              <tr key={c.id} className="text-sm text-gray-700">
                <td className="p-2 border">{c.id}</td>
                <td className="p-2 border">{c.cliente?.nombre}</td>
                <td className="p-2 border">{c.descripcion}</td>
                <td className="p-2 border">S/ {c.precioEstimado.toFixed(2)}</td>
                <td className="p-2 border">{c.estado}</td>
                <td className="p-2 border space-x-2">
                  {c.estado === "Pendiente" ? (
                    <>
                      <button
                        onClick={() => aprobarCotizacion(c.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Aprobar
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </>
                  ) : (
                    <span className="text-green-700 font-semibold">Aprobado</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminQuotes;
