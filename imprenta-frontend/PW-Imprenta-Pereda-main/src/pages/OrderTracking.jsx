import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const steps = ["Recibido", "En proceso", "Enviado", "Entregado"];

const OrderTracking = () => {
  const [pedido, setPedido] = useState(null);
  const clienteId = localStorage.getItem("clienteId");

  useEffect(() => {
    fetch(`http://localhost:8081/api/pedidos/cliente/${clienteId}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setPedido(data[data.length - 1]); // último pedido
        }
      })
      .catch(err => console.error("Error al cargar pedidos:", err));
  }, []);

  if (!pedido) {
    return <p className="p-6">No tienes pedidos registrados.</p>;
  }

  const currentStep = steps.findIndex(s => s.toLowerCase() === pedido.estado?.toLowerCase());

  return (
    <div className="bg-white min-h-screen">
      <section className="max-w-xl mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">
          Seguimiento de pedido
        </h2>

        {/* Progreso visual */}
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
                    <div className="w-2 h-2 bg-gray-500 rounded-full" />
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

        {/* Detalles reales del pedido */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Detalles del pedido
        </h3>
        <div className="space-y-2 text-sm text-gray-700 mb-6">
          <p><strong>ID:</strong> {pedido.id}</p>
          <p><strong>Descripción:</strong> {pedido.descripcion}</p>
          <p><strong>Estado:</strong> {pedido.estado}</p>
          <p><strong>Entrega:</strong> {pedido.fechaEntrega}</p>
        </div>

        <button className="w-full bg-orange-600 text-white py-2 font-semibold rounded hover:bg-orange-700 transition">
          CONTACTAR
        </button>
      </section>
    </div>
  );
};

export default OrderTracking;
