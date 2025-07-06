import {
  FaClipboardList,
  FaFileInvoice,
  FaUsers,
  FaBoxes,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [pedidos, setPedidos] = useState([]);
  const [stockBajo, setStockBajo] = useState([]);

  useEffect(() => {
    // Obtener pedidos
    fetch("http://localhost:8081/api/pedidos")
      .then((res) => res.json())
      .then((data) => setPedidos(data))
      .catch((err) => console.error("Error cargando pedidos:", err));

    // Obtener productos con stock bajo
    fetch("http://localhost:8081/api/productos/stock-bajo")
      .then((res) => res.json())
      .then((data) => setStockBajo(data))
      .catch((err) => console.error("Error cargando stock:", err));
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Main dashboard */}
      <main className="flex-1 bg-gray-50 p-6">
        <h1 className="text-2xl font-bold text-[var(--blue-main)] mb-6">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pedidos por día */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Pedidos por día</h2>
            <p className="text-3xl text-[var(--orange-main)] font-bold text-center">
              {pedidos.length}
            </p>
          </div>

          {/* Alerta de stock */}
          <div className="bg-orange-100 text-[var(--orange-main)] p-4 rounded shadow flex items-center gap-2">
            <FaExclamationTriangle className="text-xl" />
            {stockBajo.length > 0 ? (
              <span className="font-semibold">
                {stockBajo.length} producto(s) con stock mínimo
              </span>
            ) : (
              <span className="font-semibold">Todo está en orden</span>
            )}
          </div>
        </div>

        {/* Últimos pedidos */}
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Últimos pedidos</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            {pedidos
              .slice()
              .reverse()
              .slice(0, 4)
              .map((pedido) => (
                <li key={pedido.id} className="bg-gray-100 p-2 rounded">
                  Pedido #{pedido.id} – {pedido.descripcion}
                </li>
              ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
