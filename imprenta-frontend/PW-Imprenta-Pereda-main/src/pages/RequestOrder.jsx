import { useState } from "react";

const RequestOrder = () => {
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [estado] = useState("Pendiente");  // Estado fijo, por ahora
  const [pedidos, setPedidos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clienteId = localStorage.getItem("clienteId");
    if (!clienteId) {
      alert("Debes iniciar sesión para registrar un pedido.");
      return;
    }

    if (!descripcion || !fechaEntrega) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const pedido = {
      descripcion, estado, fechaEntrega, cliente: { id: Number(clienteId) }  // Envía el cliente correctamente
    };

    try {
      const response = await fetch("http://localhost:8081/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pedido)
      });

      if (!response.ok) throw new Error("Error al registrar el pedido");

      const data = await response.json();

      setPedidos([...pedidos, data]);
      setDescripcion("");
      setFechaEntrega("");
      alert("✅ Pedido registrado con éxito");

    } catch (error) {
      console.error(error);
      alert("❌ No se pudo registrar el pedido");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Registrar nuevo pedido</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium">Descripción del pedido</label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Fecha de entrega</label>
            <input
              type="date"
              value={fechaEntrega}
              onChange={(e) => setFechaEntrega(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Enviar pedido
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestOrder;
