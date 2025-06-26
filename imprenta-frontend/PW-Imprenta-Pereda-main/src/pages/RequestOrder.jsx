const RequestOrder = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mt-8 text-center text-[var(--blue-main)]">
        Solicitar Pedido
      </h1>
      <div className="bg-opacity-70 p-6 rounded-lg max-w-md mx-auto shadow-md backdrop-blur-sm my-8">
        <form className="flex flex-col space-y-4">
          <div>
            <label className="block text-[var(--blue-main)] font-semibold mb-1">
              Tipo de impresión
            </label>
            <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none">
              <option disabled selected>
                an option
              </option>
              <option value="digital">Digital</option>
              <option value="offset">Offset</option>
              {/* Puedes agregar más opciones aquí */}
            </select>
          </div>

          <div>
            <label className="block text-[var(--blue-main)] font-semibold mb-1">
              Material
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[var(--blue-main)] font-semibold mb-1">
              Cantidad
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[var(--blue-main)] font-semibold mb-1">
              Adjuntar archivos (opcional)
            </label>
            <div>
              <label
                htmlFor="file-upload"
                className="cursor-pointer w-full text-center border border-[var(--gray-main)] py-2 px-3 rounded-lg bg-gray-100 inline-block"
              >
                Seleccionar archivo
              </label>
              <input id="file-upload" type="file" className="hidden" />
            </div>
          </div>

          <button
            type="submit"
            className="bg-[var(--orange-main)] text-white font-bold py-2 rounded transition duration-300"
          >
            ENVIAR SOLICITUD
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestOrder;
