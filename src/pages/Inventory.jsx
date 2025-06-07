import { useState } from "react";

const initialInventory = [
  {
    producto: "Producto A",
    categoria: "Categoría A",
    stock: 50,
    stockMinimo: 20,
  },
  {
    producto: "Producto B",
    categoria: "Categoría B",
    stock: 10,
    stockMinimo: 15,
  },
  {
    producto: "Producto C",
    categoria: "Categoría C",
    stock: 25,
    stockMinimo: 10,
  },
  {
    producto: "Producto D",
    categoria: "Categoría A",
    stock: 35,
    stockMinimo: 25,
  },
];

const Inventory = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  const categoriasUnicas = [
    "Todas",
    ...Array.from(new Set(initialInventory.map((item) => item.categoria))),
  ];

  const inventarioFiltrado =
    categoriaSeleccionada === "Todas"
      ? initialInventory
      : initialInventory.filter(
          (item) => item.categoria === categoriaSeleccionada
        );

  return (
    <div>
      <h2 className="text-4xl font-semibold mb-4 text-center mt-4">
        Inventario
      </h2>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4 my-8">
        <h2 className="text-lg font-bold">Inventario actual</h2>
        <table className="w-full text-sm border border-gray-300 rounded overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2">Producto</th>
              <th className="text-left p-2">Categoría</th>
              <th className="text-left p-2">Stock</th>
              <th className="text-left p-2">Stock mínimo</th>
            </tr>
          </thead>
          <tbody>
            {inventarioFiltrado.map((item, index) => (
              <tr key={index} className="border-t border-gray-200 text-center">
                <td className="p-2">{item.producto}</td>
                <td className="p-2">{item.categoria}</td>
                <td className="p-2">{item.stock}</td>
                <td className="p-2">{item.stockMinimo}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <button className="bg-[var(--orange-main)] text-white font-semibold px-4 py-2 rounded">
            SOLICITAR COMPRA
          </button>
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Filtro por categoría
          </label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            {categoriasUnicas.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat === "Todas" ? "Todas las categorías" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
