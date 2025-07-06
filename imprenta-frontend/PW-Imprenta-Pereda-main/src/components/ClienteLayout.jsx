import { Link, Outlet } from "react-router-dom";

const ClienteLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Menú lateral del cliente */}
      <aside className="w-64 bg-[var(--blue-main)] text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-6">Área Cliente</h2>
        <nav className="space-y-2">
          <Link to="/cliente/solicitar" className="hover:underline block">
            Registrar Pedido
          </Link>
          <Link to="/cliente/seguimiento" className="hover:underline block">
            Seguimiento Pedido
          </Link>
          <Link to="/cliente/cotizaciones" className="hover:underline block">
            Mis Cotizaciones
          </Link>
        </nav>
      </aside>

      {/* Contenido */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ClienteLayout;
