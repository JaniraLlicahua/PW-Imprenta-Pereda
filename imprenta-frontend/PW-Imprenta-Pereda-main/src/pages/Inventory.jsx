import { useEffect, useState } from "react";

const Inventory = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
  const [formulario, setFormulario] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    stock: "",
    precio: ""
  });

  const obtenerProductos = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/productos");
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      alert("❌ Error al cargar productos");
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const categorias = [
    "Todas",
    ...new Set(productos.map((p) => p.descripcion || "Sin categoría")),
  ];

  const filtrados =
    categoriaFiltro === "Todas"
      ? productos
      : productos.filter((p) => p.descripcion === categoriaFiltro);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = formulario.id
      ? `http://localhost:8081/api/productos/${formulario.id}`
      : "http://localhost:8081/api/productos";
    const method = formulario.id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formulario)
      });

      if (!res.ok) throw new Error("Error al guardar el producto");

      await obtenerProductos();
      setFormulario({ id: null, nombre: "", descripcion: "", stock: "", precio: "" });
      alert("✅ Producto guardado correctamente");
    } catch (error) {
      alert("❌ Error al guardar producto");
    }
  };

  const editarProducto = (p) => {
    setFormulario({
      id: p.id,
      nombre: p.nombre,
      descripcion: p.descripcion,
      stock: p.stock,
      precio: p.precio,
    });
  };

  const eliminarProducto = async (id) => {
    if (!confirm("¿Seguro de eliminar este producto?")) return;
    try {
      const res = await fetch(`http://localhost:8081/api/productos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      await obtenerProductos();
      alert("✅ Producto eliminado");
    } catch {
      alert("❌ Error al eliminar");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Inventario</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold">Registrar / Editar Producto</h3>
        <input
          type="text"
          placeholder="Nombre"
          className="border p-2 w-full rounded"
          value={formulario.nombre}
          onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Descripción / Categoría"
          className="border p-2 w-full rounded"
          value={formulario.descripcion}
          onChange={(e) => setFormulario({ ...formulario, descripcion: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          className="border p-2 w-full rounded"
          value={formulario.stock}
          onChange={(e) => setFormulario({ ...formulario, stock: Number(e.target.value) })}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          className="border p-2 w-full rounded"
          value={formulario.precio}
          onChange={(e) => setFormulario({ ...formulario, precio: Number(e.target.value) })}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {formulario.id ? "Actualizar" : "Agregar"}
        </button>
      </form>

      {/* Filtro por categoría */}
      <div className="mb-4">
        <label className="font-semibold mr-2">Filtrar por categoría:</label>
        <select
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          className="border p-2 rounded"
        >
          {categorias.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla de productos */}
      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Descripción</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Precio</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map((prod) => (
            <tr key={prod.id} className="hover:bg-gray-50">
              <td className="p-2 border">{prod.nombre}</td>
              <td className="p-2 border">{prod.descripcion}</td>
              <td className="p-2 border">{prod.stock}</td>
              <td className="p-2 border">S/ {prod.precio.toFixed(2)}</td>
              <td className="p-2 border flex gap-2 justify-center">
                <button
                  onClick={() => editarProducto(prod)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarProducto(prod.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
