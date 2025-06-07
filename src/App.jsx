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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/inventario" element={<Inventory />} />
        <Route path="/seguimiento-pedido" element={<OrderTracking />} />
        <Route path="/solicitar-pedido" element={<RequestOrder />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/cotizaciones" element={<Quotes />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/registrar" element={<Register />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
