import { useState } from "react";

const RegistrarCorreccion = ({ pedidoId, onRegistrado }) => {
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return alert("El mensaje no puede estar vacío");

    try {
      const res = await fetch("http://localhost:8081/api/correcciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          motivo: mensaje,
          pedido: { id: pedidoId }
        }),
      });

      if (!res.ok) throw new Error("Error al registrar corrección");

      const data = await res.json();
      alert("✅ Corrección registrada");
      if (onRegistrado) onRegistrado(data);
    } catch (err) {
      alert("❌ No se pudo registrar");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Mensaje de corrección</label>
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className="w-full border p-2 rounded"
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Enviar Corrección
      </button>
    </form>
  );
};

export default RegistrarCorreccion;

