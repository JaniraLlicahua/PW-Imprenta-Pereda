import { useState, useEffect } from "react";

const ClienteQuotes = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [editando, setEditando] = useState(null);

  const clienteId = localStorage.getItem("clienteId");

  useEffect(() => {
    if (clienteId) {
      fetch(`http://localhost:8081/api/cotizaciones/cliente/${clienteId}`)
        .then((res) => res.json())
        .then((data) => setCotizaciones(data))
        .catch((err) => console.error("Error al cargar cotizaciones", err));
    }
  }, [clienteId]);

  const resetForm = () => {
    setTipo("");
    setDescripcion("");
    setCantidad("");
    setArchivo(null);
    setEditando(null);
  };

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
      const actualizadas = editando
        ? cotizaciones.map((c) => (c.id === nueva.id ? nueva : c))
        : [...cotizaciones, nueva];

      setCotizaciones(actualizadas);
      alert(`✅ Cotización ${editando ? "actualizada" : "registrada"}`);
      resetForm();
    } catch (error) {
      alert("❌ Error al guardar cotización");
    }
  };

  const handleEdit = (cot) => {
    if (cot.estado === "Aprobada") return alert("No puedes editar una cotización aprobada");
    setTipo(cot.tipo || "");
    setDescripcion(cot.descripcion);
    setCantidad(cot.cantidad || "");
    setEditando(cot);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Mis Cotizaciones</h2>

        {cotizaciones.length === 0 ? (
          <p className="text-gray-500">No hay cotizaciones solicitadas.</p>
        ) : (
          <table className="w-full table-auto border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Tipo</th>
                <th className="p-2 border">Descripción</th>
                <th className="p-2 border">Cantidad</th>
                <th className="p-2 border">Estado</th>
                <th className="p-2 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cotizaciones.map((cot) => (
                <tr key={cot.id} className="hover:bg-gray-100">
                  <td className="p-2 border">{cot.tipo}</td>
                  <td className="p-2 border">{cot.descripcion}</td>
                  <td className="p-2 border">{cot.cantidad}</td>
                  <td className="p-2 border">
                    {cot.estado}
                    {cot.estado === "Rechazada" && cot.comentarioRechazo && (
                      <div className="text-red-600 text-xs mt-1">
                        Motivo: {cot.comentarioRechazo}
                      </div>
                    )}
                  </td>
                  <td className="p-2 border space-y-1">
                    {cot.estado === "Aprobada" ? (
                      <a
                        href={`/cliente/solicitar?cotizacionId=${cot.id}`}
                        className="text-green-600 hover:underline block"
                      >
                        Pedido
                      </a>
                    ) : (
                      <button
                        onClick={() => handleEdit(cot)}
                        className="text-yellow-600 hover:underline block"
                      >
                        Editar
                      </button>
                    )}

                    {/* Mostrar imagen o enlace si existe archivo */}
                    {cot.nombreArchivo && (
                      cot.nombreArchivo.endsWith(".jpg") || cot.nombreArchivo.endsWith(".png") ? (
                        <img
                          src={`http://localhost:8081/api/cotizaciones/archivo/${cot.id}`}
                          alt="archivo"
                          className="w-20 h-auto border mt-1 rounded"
                        />
                      ) : (
                        <a
                          href={`http://localhost:8081/api/cotizaciones/archivo/${cot.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline text-xs block mt-1"
                        >
                          Ver archivo
                        </a>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Formulario */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6" id="formulario">
        <h3 className="text-lg font-semibold mb-4">
          {editando ? "Editar Cotización" : "Nueva Cotización"}
        </h3>

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
            className={`bg-${editando ? "yellow" : "blue"}-600 text-white py-2 px-4 rounded hover:bg-${editando ? "yellow" : "blue"}-700`}
          >
            {editando ? "Actualizar Cotización" : "Enviar Cotización"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClienteQuotes;


