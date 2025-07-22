import { useState } from "react";

const ClienteFollow = ({ pedidoId }) => {
  const [comentario, setComentario] = useState("");
  const [canal, setCanal] = useState("WhatsApp");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8081/api/seguimiento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comentario,
          canalContacto: canal,
          pedido: { id: pedidoId },
        }),
      });

      if (!res.ok) throw new Error("Error al enviar seguimiento");
      alert("✅ Seguimiento registrado");
      setComentario("");
    } catch (err) {
      alert("❌ No se pudo registrar seguimiento");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-4">
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Comentario post-entrega"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      />
      <select
        value={canal}
        onChange={(e) => setCanal(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="WhatsApp">WhatsApp</option>
        <option value="Correo">Correo</option>
      </select>
      <button className="bg-orange-600 text-white px-4 py-1 rounded hover:bg-orange-700">
        Enviar seguimiento
      </button>
    </form>
  );
};

export default ClienteFollow;
