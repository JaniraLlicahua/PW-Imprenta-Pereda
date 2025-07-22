import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CorreccionModal from "./CorrecionModal";


const ClientePedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const clienteId = localStorage.getItem("clienteId");
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  useEffect(() => {
    if (clienteId) {
      fetch(`http://localhost:8081/api/pedidos/cliente/${clienteId}`)
        .then(res => res.json())
        .then(data => {
          console.log("📦 Pedidos cargados:", data);
          setPedidos(data);
        })
        .catch(err => console.error("Error al cargar pedidos", err));
    }
  }, [clienteId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mis Pedidos</h2>

      {pedidos.length === 0 ? (
        <p className="text-gray-500">No tienes pedidos registrados aún.</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido.id} className="border p-4 rounded mb-4 shadow">
            <p><strong>Descripción:</strong> {pedido.descripcion}</p>
            <p><strong>Estado:</strong> {pedido.estado}</p>
            <p><strong>Fecha entrega:</strong> {pedido.fechaEntrega}</p>
            <p><strong>Etapa final:</strong> {pedido.etapaFinal || "No asignada"}</p>

            {/* Enlace a seguimiento post-entrega solo si está entregado */}
            {pedido.estado === "Entregado" && (
              <Link
                to={`/cliente/seguimiento/${pedido.id}`}
                className="text-blue-600 hover:underline"
              >
                Enviar comentario post-entrega
              </Link>
            )}

            {/* Enlace a corrección solo si está entregado */}
            {pedido.estado === "Entregado" && (
              <button
                onClick={() => setPedidoSeleccionado(pedido.id)}
                className="text-red-600 hover:underline ml-4"
              >
                Registrar corrección
              </button>
            )}
          </div>
        ))
      )}
      {pedidoSeleccionado && (
        <CorreccionModal
          pedidoId={pedidoSeleccionado}
          onClose={() => setPedidoSeleccionado(null)}
        />
      )}
    </div>
  );
};

export default ClientePedidos;
