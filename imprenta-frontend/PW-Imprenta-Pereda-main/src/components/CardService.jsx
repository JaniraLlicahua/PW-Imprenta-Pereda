const CardService = ({ image, title }) => {
  return (
    <div className="w-3/4 p-2">
      <div className="flex justify-center py-3">
        <img src={image} alt={title} />
      </div>
      <div className="space-y-3 text-center">
        <h1 className="text-[var(--blue-main)] text-2xl font-bold">{title}</h1>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <button className="bg-[var(--orange-main)] text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition">
          Solicitar ahora
        </button>
      </div>
    </div>
  );
};

export default CardService; 