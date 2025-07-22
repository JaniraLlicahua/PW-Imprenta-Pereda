import { useState, useEffect } from "react";

const CotizacionModal = ({ onClose, onSave, editando, clienteId }) => {
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [archivo, setArchivo] = useState(null);

  useEffect(() => {
    if (editando) {
      setTipo(editando.tipo || "");
      setDescripcion(editando.descripcion || "");
      setCantidad(editando.cantidad || "");
    } else {
      setTipo("");
      setDescripcion("");
      setCantidad("");
      setArchivo(null);
    }
  }, [editando]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tipo || !descripcion || !cantidad) return alert("Completa todos los campos");

    const formData = new FormData();
    formData.append("tipo", tipo);
    formData.append("descripcion", descripcion);
    formData.append("cantidad", cantidad);
    formData.append("clienteId", clienteId);
    if (archivo) formData.append("archivo", archivo);

    const url = editando
      ? `http://localhost:8081/api/cotizaciones/${editando.id}`
      : "http://localhost:8081/api/cotizaciones";

    try {
      const res = await fetch(url, {
        method: editando ? "PUT" : "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error al guardar cotización");
      const nueva = await res.json();
      onSave(nueva); // devuelve la cotización nueva al padre
      onClose(); // cierra el modal
    } catch {
      alert("❌ Error al guardar cotización");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">
          {editando ? "Editar Cotización" : "Nueva Cotización"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Tipo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            >
              <option value="">Seleccione...</option>
              <option value="Producto">Producto</option>
              <option value="Servicio">Servicio</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Cantidad</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Archivo adjunto (opcional)</label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setArchivo(e.target.files[0])}
              className="block w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            {editando ? "Actualizar" : "Enviar"} Cotización
          </button>
        </form>
      </div>
    </div>
  );
};

export default CotizacionModal;
