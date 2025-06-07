import {
  FaClipboardList,
  FaFileInvoice,
  FaUsers,
  FaBoxes,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="bg-[#0a2048] text-white w-48 p-4 space-y-6">
        <h2 className="text-xl font-bold mb-8">ADMIN</h2>
        <nav className="space-y-4">
          <div className="flex items-center gap-2">
            <FaClipboardList /> <span>Pedidos</span>
          </div>
          <div className="flex items-center gap-2">
            <FaFileInvoice /> <span>Cotizaciones</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUsers /> <span>Clientes</span>
          </div>
          <Link to="/admin/inventario" className="flex items-center gap-2">
            <FaBoxes /> <span>Inventario</span>
          </Link>
        </nav>
      </aside>

      {/* Main dashboard */}
      <main className="flex-1 bg-gray-50 p-6">
        <h1 className="text-2xl font-bold text-[#0a2048] mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pedidos por día */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Pedidos por día</h2>
            <img
              src="/graph-placeholder.png"
              alt="Gráfico de pedidos"
              className="w-full h-32 object-contain"
            />
          </div>

          {/* Alerta de stock */}
          <div className="bg-orange-100 text-orange-700 p-4 rounded shadow flex items-center gap-2">
            <FaExclamationTriangle className="text-xl" />
            <span className="font-semibold">Alerta de stock mínimo</span>
          </div>
        </div>

        {/* Últimos pedidos */}
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Últimos pedidos</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="bg-gray-100 p-2 rounded">
              Pedido #123456 - Juan Pérez
            </li>
            <li className="bg-gray-100 p-2 rounded">
              Pedido #123457 - María López
            </li>
            <li className="bg-gray-100 p-2 rounded">
              Pedido #123458 - Carlos Ramírez
            </li>
            <li className="bg-gray-100 p-2 rounded">
              Pedido #123459 - Ana Torres
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
