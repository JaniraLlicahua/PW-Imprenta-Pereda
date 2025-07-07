import { useEffect, useState } from "react";
import CardService from "../components/CardService";

// IMPORT IMAGES (asegúrate de tenerlas en la misma posición lógica que los servicios)
import service1 from "../images/services/impresion-offset.png";
import service2 from "../images/services/impresion-digital.png";
import service3 from "../images/services/tarjetas-presentacion.png";
import service4 from "../images/services/material-publicitario.png";

const Services = () => {
  const [servicios, setServicios] = useState([]);

  const imagenes = [service1, service2, service3, service4];

  useEffect(() => {
    fetch("http://localhost:8081/api/servicios")
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch((error) => {
        console.error("Error al obtener servicios:", error);
        alert("No se pudieron cargar los servicios");
      });
  }, []);

  return (
    <div>
      <div className="py-10 w-5/6 m-auto">
        <h1 className="text-5xl mb-14 font-bold text-[var(--blue-main)] text-center">
          Servicios
        </h1>

        {servicios.length === 0 ? (
          <p className="text-gray-600 text-center">No hay servicios registrados.</p>
        ) : (
          <div className="grid grid-cols-2 place-items-center gap-4">
            {servicios.map((servicio, index) => (
              <CardService
                key={servicio.id}
                image={imagenes[index % imagenes.length]} // asigna imagen por posición
                title={servicio.nombre}
                description={servicio.descripcion}
                price={servicio.precio}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
