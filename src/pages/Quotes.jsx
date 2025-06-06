import { useState } from "react";

const Cotizaciones = () => {
  const [cotizaciones, setCotizaciones] = useState([]);

  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tipo || !descripcion || !cantidad) return;

    const nuevaCotizacion = {
      fecha: new Date().toLocaleDateString("es-PE"),
      descripcion,
      estado: "Enviado",
    };

    setCotizaciones([...cotizaciones, nuevaCotizacion]);
    setTipo("");
    setDescripcion("");
    setCantidad("");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Cotizaciones solicitadas</h2>

        {cotizaciones.length === 0 ? (
          <p className="text-gray-500">No hay cotizaciones solicitadas.</p>
        ) : (
          <table className="w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Fecha</th>
                <th className="p-2 border">Descripción</th>
                <th className="p-2 border">Estado</th>
                <th className="p-2 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cotizaciones.map((cotizacion, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 border">{cotizacion.fecha}</td>
                  <td className="p-2 border">{cotizacion.descripcion}</td>
                  <td className="p-2 border">{cotizacion.estado}</td>
                  <td className="p-2 border">
                    <button className="text-blue-600 hover:underline">
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <a
          href="#formulario"
          className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 mb-4 inline-block mt-4"
        >
          SOLICITAR NUEVA COTIZACIÓN
        </a>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6" id="formulario">
        <h3 className="text-lg font-semibold mb-4">Formulario de solicitud</h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Tipo de cotización
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Seleccione una opción</option>
              <option value="producto">Producto</option>
              <option value="servicio">Servicio</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Descripción
            </label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Cantidad</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Archivo</label>
            <input type="file" className="w-full" />
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          >
            ENVIAR SOLICITUD
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cotizaciones;
