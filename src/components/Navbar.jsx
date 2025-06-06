import { Link } from "react-router-dom";
import Logo from "../images/cropped-logopereda.png";

const Navbar = () => {
  return (
    <div className="text-white bg-[var(--blue-second)]">
      <div className="w-5/6 m-auto flex items-center justify-between py-3">
        <Link to="/">
          <img src={Logo} alt="Imprenta Pereda" className="w-full" />
        </Link>
        <div className="w-1/2">
          <ul className="flex justify-around text-xl">
            <Link to="/">Inicio</Link>
            <Link to="/servicios">Servicios</Link>
            <Link to="/cotizaciones">Cotizaciones</Link>
            <Link to="/contacto">Contacto</Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
