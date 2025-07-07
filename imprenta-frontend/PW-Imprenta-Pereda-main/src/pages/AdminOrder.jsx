import { useEffect, useState } from "react";
import { FaCheckCircle, FaTrash, FaEdit } from "react-icons/fa";

const steps = ["Recibido", "En proceso", "Enviado", "Entregado"];

const AdminOrder = () => {
  const [pedidos, setPedidos] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState("");

  const cargarPedidos = async () => {
    try {
      const url = fechaFiltro
        ? `http://localhost:8081/api/pedidos/filtrar?fecha=${fechaFiltro}`
        : "http://localhost:8081/api/pedidos";

      const res = await fetch(url);
      const data = await res.json();
      setPedidos(data);
    } catch (error) {
      alert("Error al cargar pedidos");
    }
  };

  useEffect(() => {
    cargarPedidos();
  }, [fechaFiltro]);

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      const res = await fetch(`http://localhost:8081/api/pedidos/${id}/estado`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoEstado),
      });
      if (!res.ok) throw new Error();
      alert("✅ Estado actualizado");
      cargarPedidos();
    } catch {
      alert("❌ Error al actualizar estado");
    }
  };

  const eliminarPedido = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este pedido?")) return;
    try {
      await fetch(`http://localhost:8081/api/pedidos/${id}`, { method: "DELETE" });
      alert("✅ Pedido eliminado (soft delete)");
      cargarPedidos();
    } catch {
      alert("❌ Error al eliminar pedido");
    }
  };

  return (
    <div className="bg-white min-h-screen p-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        Seguimiento y Gestión de Pedidos
      </h2>

      <div className="mb-6 flex gap-4 items-center justify-center">
        <label className="font-medium">Filtrar por fecha:</label>
        <input
          type="date"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={() => setFechaFiltro("")}
          className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
        >
          Limpiar filtro
        </button>
      </div>

      {pedidos.length === 0 ? (
        <p className="text-center text-gray-500">No hay pedidos registrados.</p>
      ) : (
        pedidos.map((pedido) => {
          const currentStep = steps.indexOf(pedido.estado);

          return (
            <div
              key={pedido.id}
              className="border border-gray-300 rounded-lg p-6 mb-8 shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p><span className="font-semibold">Cliente:</span> {pedido.cliente?.nombre} {pedido.cliente?.apellido}</p>
                  <p><span className="font-semibold">Descripción:</span> {pedido.descripcion}</p>
                  <p><span className="font-semibold">Fecha Entrega:</span> {pedido.fechaEntrega}</p>
                </div>
                <button
                  onClick={() => eliminarPedido(pedido.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  <FaTrash />
                </button>
              </div>

              <div className="relative flex justify-between items-center mb-6">
                <div className="absolute inset-x-[10%] h-1 bg-gray-200 z-0 bottom-[65%]" />
                {steps.map((step, index) => (
                  <div key={step} className="z-10 flex-1 text-center relative">
                    <div className="flex justify-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                          index <= currentStep
                            ? "bg-orange-600 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {index <= currentStep ? (
                          <FaCheckCircle size={18} />
                        ) : (
                          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <p
                      className={`text-sm font-medium ${
                        index <= currentStep ? "text-orange-600" : "text-gray-600"
                      }`}
                    >
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <label className="font-medium mr-2">Cambiar estado:</label>
                <select
                  value={pedido.estado}
                  onChange={(e) => actualizarEstado(pedido.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  {steps.map((estado) => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AdminOrder;