import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-[var(--gray-main)]">
      <div className="w-5/6 m-auto flex justify-between text-[var(--blue-main)] py-10">
        <div className="text-xl font-bold">
          <p>Dirección</p>
          <p>Teléfono</p>
          <p>correo@ejemplo.com</p>
        </div>
        <div className="flex space-x-2 items-end">
          <FaFacebookF size={28} />
          <FaInstagram size={28} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
