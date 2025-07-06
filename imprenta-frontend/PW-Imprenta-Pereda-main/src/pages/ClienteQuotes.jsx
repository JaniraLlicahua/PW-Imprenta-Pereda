import { useState, useEffect } from "react";

const ClienteQuotes = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [precioEstimado, setPrecioEstimado] = useState("");
  const clienteId = localStorage.getItem("clienteId");

  useEffect(() => {
    if (clienteId) {
      fetch(`http://localhost:8081/api/cotizaciones/cliente/${clienteId}`)
        .then((res) => res.json())
        .then((data) => {
          // Mapeo para que React use precioEstimado sin importar el backend
          const mapped = data.map(c => ({
            ...c,
            precioEstimado: c.precioEstimado ?? c.precio_estimado ?? 0
          }));
          setCotizaciones(mapped);
        })
        .catch((err) => console.error("Error al cargar cotizaciones", err));
    }
  }, [clienteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!descripcion || !precioEstimado) {
      alert("Por favor completa todos los campos.");
      return;
    }

    console.log("Enviando datos:", { clienteId, descripcion, precioEstimado });

    try {
      const response = await fetch("http://localhost:8081/api/cotizaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clienteId: Number(clienteId),
          descripcion,
          precioEstimado,
        }),
      });

      if (!response.ok) throw new Error("Error al registrar cotización");

      const data = await response.json();
      setCotizaciones([
        ...cotizaciones,
        {
          ...data,
          precioEstimado: data.precioEstimado ?? data.precio_estimado ?? 0
        }
      ]);
      setDescripcion("");
      setPrecioEstimado("");
      alert("✅ Cotización registrada con éxito");
    } catch (error) {
      console.error(error);
      alert("❌ No se pudo registrar la cotización");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mis Cotizaciones</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label>Precio estimado:</label>
          <input
            type="number"
            value={precioEstimado}
            onChange={(e) => setPrecioEstimado(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Registrar Cotización
        </button>
      </form>

      {cotizaciones.length === 0 ? (
        <p>No tienes cotizaciones registradas.</p>
      ) : (
        <ul className="space-y-2">
          {cotizaciones.map((c) => (
            <li key={c.id} className="bg-gray-100 p-2 rounded">
              <strong>{c.descripcion}</strong> - S/ {c.precioEstimado.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClienteQuotes;
