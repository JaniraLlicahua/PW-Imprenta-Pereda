import CardService from "../components/CardService";

// IMPORT IMAGE OF SERVICES
import service1 from "../images/services/impresion-offset.png";
import service2 from "../images/services/impresion-digital.png";
import service3 from "../images/services/tarjetas-presentacion.png";
import service4 from "../images/services/material-publicitario.png";

const Services = () => {
  const services = [
    {
      image: service1,
      title: "Impresión digital",
    },
    {
      image: service2,
      title: "Impresión offset",
    },
    {
      image: service3,
      title: "Material publicitario",
    },
    {
      image: service4,
      title: "Tarjetas presentación",
    },
  ];

  return (
    <div>
      <div className="py-10 w-5/6 m-auto">
        <h1 className="text-5xl mb-14 font-bold text-[var(--blue-main)] text-center">
          Servicios
        </h1>

        <div className="grid grid-cols-2 place-items-center gap-4">
          {services.map((service, index) => (
            <CardService
              key={index}
              image={service.image}
              title={service.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
