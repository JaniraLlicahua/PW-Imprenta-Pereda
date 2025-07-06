import { useState, useEffect } from "react";

const RequestOrder = () => {
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const clienteId = localStorage.getItem("clienteId");
  const [cotizacionesAprobadas, setCotizacionesAprobadas] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8081/api/cotizaciones/cliente/${clienteId}/aprobadas`)
      .then(res => res.json())
      .then(data => setCotizacionesAprobadas(data))
      .catch(err => console.error("Error al cargar cotizaciones aprobadas:", err));
  }, [clienteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!descripcion || !fechaEntrega) {
      alert("Completa todos los campos");
      return;
    }

    const pedido = {
      descripcion,
      estado: "Pendiente",
      fechaEntrega,
      cliente: { id: Number(clienteId) }
    };

    try {
      const response = await fetch("http://localhost:8081/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido)
      });

      if (!response.ok) throw new Error("Error al registrar pedido");

      const data = await response.json();
      setPedidos([...pedidos, data]);
      setDescripcion(""); setFechaEntrega("");
      alert("✅ Pedido registrado");
    } catch (error) {
      alert("❌ No se pudo registrar el pedido");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Registrar nuevo pedido</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label>Cotización aprobada</label>
            <select
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            >
              <option value="">Selecciona una cotización</option>
              {cotizacionesAprobadas.map((c) => (
                <option key={c.id} value={c.descripcion}>
                  {c.descripcion} – S/ {c.precioEstimado.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Fecha de entrega</label>
            <input
              type="date"
              value={fechaEntrega}
              onChange={(e) => setFechaEntrega(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Enviar Pedido
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestOrder;
