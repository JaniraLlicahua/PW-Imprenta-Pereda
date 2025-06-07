const Contact = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mt-8 text-center text-[var(--blue-main)]">
        Contacto
      </h1>
      <div className="flex flex-col md:flex-row bg-white/80 p-6 md:p-10 rounded-2xl shadow-lg max-w-4xl mx-auto mb-10">
        {/* Formulario */}
        <form className="w-full md:w-1/2 space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
          />
          <textarea
            rows="4"
            placeholder="Mensaje"
            className="w-full p-3 resize-none rounded-lg border border-gray-300 focus:outline-none"
          ></textarea>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg"
          >
            ENVIAR
          </button>
        </form>

        {/* Información de contacto */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start md:space-y-4 text-sm text-gray-800 mb-6 md:mb-0 md:pl-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15634.982320336536!2d-76.98026881058759!3d-11.570087767336684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91066fdcf3f71b79%3A0x1e7c27b698a00563!2sPortachuelo%2C%2015125!5e0!3m2!1ses!2spe!4v1749311376445!5m2!1ses!2spe"
            style={{ border: "0", borderRadius: "10px" }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className=" space-y-2">
            <p>
              <strong>Dirección</strong>
            </p>
            <p>
              <strong>Teléfono</strong>
            </p>
            <p>
              <strong>Horarios de atención</strong>
              <p>Lun–Vie: 9:00 a 18:00</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
