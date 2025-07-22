import { useEffect, useState } from "react";

const ClienteCorreccionPedido = () => {
  const [correcciones, setCorrecciones] = useState([]);
  const clienteId = localStorage.getItem("clienteId");

  useEffect(() => {
    fetch(`http://localhost:8081/api/correcciones/cliente/${clienteId}`)
      .then(res => res.json())
      .then(data => setCorrecciones(data))
      .catch(err => console.error("Error al cargar correcciones", err));
  }, [clienteId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Historial de Correcciones</h2>
      {correcciones.length === 0 ? (
        <p className="text-gray-500">No hay correcciones registradas.</p>
      ) : (
        <ul className="space-y-4">
          {correcciones.map(c => (
            <li key={c.id} className="border rounded p-4 shadow">
              <p><strong>Pedido ID:</strong> {c.pedido?.id}</p>
              <p><strong>Motivo:</strong> {c.motivo}</p>
              <p><strong>Estado:</strong> {c.estado}</p>
              <p><strong>Fecha:</strong> {new Date(c.fechaRegistro).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClienteCorreccionPedido;
