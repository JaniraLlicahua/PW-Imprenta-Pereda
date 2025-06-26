import { useEffect, useState } from "react";

const Services = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    // Al cargar el componente, hacemos el fetch al backend
    fetch("http://localhost:8081/api/servicios")
      .then((res) => res.json())
      .then((data) => {
        setServicios(data);
      })
      .catch((error) => {
        console.error("Error al obtener servicios:", error);
        alert("No se pudieron cargar los servicios");
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center text-[var(--blue-main)]">
        Servicios disponibles
      </h2>

      {servicios.length === 0 ? (
        <p className="text-gray-600 text-center">No hay servicios registrados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicios.map((servicio) => (
            <div
              key={servicio.id}
              className="bg-white rounded-lg shadow p-4 border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-[var(--orange-main)]">{servicio.nombre}</h3>
              <p className="text-gray-600">{servicio.descripcion}</p>
              <p className="text-green-700 font-bold mt-2">S/. {servicio.precio.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
