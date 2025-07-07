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

  const rechazarCotizacion = async (id) => {
    const comentario = prompt("Ingrese el motivo del rechazo:");
    if (!comentario) return;

    try {
      const response = await fetch(`http://localhost:8081/api/cotizaciones/${id}/rechazar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comentario }),
      });

      if (!response.ok) throw new Error("Error al rechazar cotización");

      // Actualiza la UI
      setCotizaciones((prev) =>
        prev.map((c) => c.id === id ? { ...c, estado: "Rechazada", comentarioRechazo: comentario } : c)
      );
      alert("❌ Cotización rechazada con comentario");
    } catch (error) {
      alert("Error al rechazar cotización");
      console.error(error);
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
              <th className="p-2 border">Archivo</th>
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
                <td className="p-2 border">
                  {c.nombreArchivo ? (
                    <div className="space-y-1 text-center">
                      {c.nombreArchivo.endsWith(".jpg") || c.nombreArchivo.endsWith(".png") ? (
                        <img
                          src={`http://localhost:8081/api/cotizaciones/archivo/${c.id}`}
                          alt="archivo"
                          className="w-20 h-auto rounded shadow border mx-auto"
                        />
                      ) : (
                        <span className="text-sm text-gray-700">{c.nombreArchivo}</span>
                      )}
                      <a
                        href={`http://localhost:8081/api/cotizaciones/archivo/${c.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={c.nombreArchivo}
                        className="block mt-1 text-blue-600 text-sm underline hover:text-blue-800"
                      >
                        Descargar
                      </a>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">Sin archivo</span>
                  )}
                </td>
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
                      <button
                        onClick={() => rechazarCotizacion(c.id)}
                        className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                      >
                        Rechazar
                      </button>
                    </>
                  ) : (
                    <span className={`font-semibold ${c.estado === "Aprobada" ? "text-green-700" : "text-red-700"}`}>
                      {c.estado}
                    </span>
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

