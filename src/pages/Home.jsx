const Home = () => {
  const services = [
    { id: 1, title: "Servicio 1" },
    { id: 2, title: "Servicio 2" },
    { id: 3, title: "Servicio 3" },
  ];

  return (
    <section>
      <div className="bg-[var(--blue-main)]">
        <div className=" max-w-7xl mx-auto px-4 py-20 text-center flex flex-col items-center gap-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Solicita tu pedido
            <br className="hidden md:block" /> ahora
          </h1>
          <button className="px-8 py-3 bg-[var(--orange-main)] hover:bg-orange-600 transition text-white font-semibold rounded-md shadow-lg">
            SOLICITA AHORA
          </button>
        </div>
      </div>

      <div>
        <div className="max-w-7xl mx-auto py-14 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--blue-main)] mb-12">
            Servicios destacados
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col items-center gap-4 bg-white/70 backdrop-blur rounded-lg p-6 shadow-sm"
              >
                <div className="w-full aspect-video flex items-center justify-center bg-gray-200 rounded-md">
                  <h1>{service.id}</h1>
                </div>
                <h3 className="text-lg font-semibold text-[var(--blue-main)] text-center">
                  {service.title}
                </h3>
                <div className="space-y-2 w-full">
                  <p className="text-sm text-gray-600 text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <p className="text-sm text-gray-600 text-center">
                    Sed do eiusmod tempor incididunt ut labore et dolore.
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Why us */}
          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mt-20 mb-10">
            ¿Por qué elegirnos?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 max-w-3xl mx-auto">
            <ul className="space-y-4 list-disc list-inside">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </li>
              <li>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris.
              </li>
            </ul>
            <div className="space-y-4">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor.
              </p>
              <p>
                Incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam.
              </p>
              <p>
                Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
