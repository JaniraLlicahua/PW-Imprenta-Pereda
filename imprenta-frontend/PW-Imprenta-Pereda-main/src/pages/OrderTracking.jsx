import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const steps = ["Recibido", "En proceso", "Enviado", "Entregado"];

const OrderTracking = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const clienteId = localStorage.getItem("clienteId");
    if (!clienteId) {
      alert("❌ No estás logueado correctamente.");
      return;
    }

    fetch(`http://localhost:8081/api/pedidos/cliente/${clienteId}`)
      .then((res) => res.json())
      .then((data) => setPedidos(data))
      .catch((err) => {
        console.error(err);
        alert("❌ Error al obtener tus pedidos");
      });
  }, []);

  if (!Array.isArray(pedidos)) {
    return <p>Error al obtener los pedidos.</p>;
  }

  return (
    <div className="bg-white min-h-screen p-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        Seguimiento de pedidos
      </h2>

      {pedidos.length === 0 ? (
        <p className="text-center text-gray-500">No tienes pedidos registrados.</p>
      ) : (
        pedidos.map((pedido) => {
          const currentStep = steps.indexOf(pedido.estado) >= 0 ? steps.indexOf(pedido.estado) : 0;

          return (
            <div
              key={pedido.id}
              className="border border-gray-300 rounded-lg p-6 mb-8 shadow-md"
            >
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
                          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <p
                      className={`text-sm font-medium ${
                        index <= currentStep
                          ? "text-orange-600"
                          : "text-gray-600"
                      }`}
                    >
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              {/* Detalles del pedido */}
              <div className="space-y-2 text-sm text-gray-700">
                <p><span className="font-semibold">Descripción:</span> {pedido.descripcion}</p>
                <p><span className="font-semibold">Estado:</span> {pedido.estado}</p>
                <p><span className="font-semibold">Fecha de Entrega:</span> {pedido.fechaEntrega}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default OrderTracking;
