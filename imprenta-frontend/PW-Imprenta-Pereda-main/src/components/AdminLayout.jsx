import {
  FaClipboardList,
  FaFileInvoice,
  FaUsers,
  FaBoxes,
} from "react-icons/fa";
import { Outlet, Link, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="bg-[var(--blue-main)] text-white w-48 p-4 space-y-6">
        <h2 className="text-xl font-bold mb-8">ADMIN</h2>
        <nav className="space-y-4">
          <Link to="/admin" className="flex items-center gap-2">
            <FaClipboardList /> <span>Pedidos</span>
          </Link>
          <Link to="/admin/cotizaciones" className="flex items-center gap-2">
            <FaFileInvoice /> <span>Cotizaciones</span>
          </Link>
          <div className="flex items-center gap-2">
            <FaUsers /> <span>Clientes</span>
          </div>
          <Link to="/admin/inventario" className="flex items-center gap-2">
            <FaBoxes /> <span>Inventario</span>
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
