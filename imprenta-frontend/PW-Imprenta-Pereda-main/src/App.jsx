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
import ProtectedRoute from "./components/ProtectedRoute";
import ClienteLayout from "./components/ClienteLayout";
import ClienteQuotes from "./pages/ClienteQuotes";  

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/inventario" element={<Inventory />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/cotizaciones" element={<Quotes />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/registrar" element={<Register />} />

        {/* Área del cliente (nuevo) ✅ */}
        <Route path="/cliente" element={<ClienteLayout />}>
          <Route path="solicitar" element={<RequestOrder />} />
          <Route path="seguimiento" element={<OrderTracking />} />
          <Route path="cotizaciones" element={<ClienteQuotes />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
