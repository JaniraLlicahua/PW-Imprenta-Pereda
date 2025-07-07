import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Quotes from "./pages/Quotes";
import Contact from "./pages/Contact";
import RequestOrder from "./pages/RequestOrder";
import Inventory from "./pages/Inventory";
import OrderTracking from "./pages/OrderTracking";
import Dashboard from "./pages/Dashboard";
import ClienteQuotes from "./pages/ClienteQuotes";
import AdminQuotes from "./pages/AdminQuotes";
import AdminClients from "./pages/AdminClients";
import AdminOrder from "./pages/AdminOrder";
import ProtectedRoute from "./components/ProtectedRoute";
import ClienteLayout from "./components/ClienteLayout";
import AdminLayout from "./components/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/servicios" element={<Services/>} />
        <Route path="/cotizaciones" element={<Quotes/>} />
        <Route path="/contacto" element={<Contact/>} />
        <Route path="/iniciar-sesion" element={<Login/>} />
        <Route path="/registrarse" element={<Register/>} />

        {/* Cliente */}
        <Route path="/cliente" element={<ClienteLayout/>}>
          <Route path="solicitar" element={<RequestOrder/>} />
          <Route path="seguimiento" element={<OrderTracking/>} />
          <Route path="cotizaciones" element={<ClienteQuotes/>} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout/></ProtectedRoute>}>
          <Route index element={<Dashboard/>} />
          <Route path="cotizaciones" element={<AdminQuotes/>} />
          <Route path="inventario" element={<Inventory/>} />
          <Route path="clientes" element={<AdminClients/>} />
          <Route path="pedidos" element={<AdminOrder/>} />
          {/* Aquí puedes agregar más rutas admin como cotizaciones, clientes, etc */}
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
