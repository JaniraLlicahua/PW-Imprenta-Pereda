import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="h-screen bg-[var(--blue-main)] text-white flex">
      <div className=" max-w-96 m-auto flex flex-col items-center space-y-6">
        <h1 className=" capitalize font-bold text-4xl text-center mb-6">
          Regístrate
        </h1>
        <div className="bg-[var(--gray-main)] p-4 rounded-xl w-[360px] shadow-2xl">
          <form className=" space-y-4">
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="name"
                className="text-[var(--blue-main)] font-bold"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="border-2 border-[var(--gray-main)] bg-white rounded-lg p-1 text-black outline-none"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="company"
                className="text-[var(--blue-main)] font-bold"
              >
                Empresa
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className="border-2 border-[var(--gray-main)] bg-white rounded-lg p-1 text-black outline-none"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="text-[var(--blue-main)] font-bold"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border-2 border-[var(--gray-main)] bg-white rounded-lg p-1 text-black outline-none"
              />
            </div>
            <div className="flex justify-center">
              <button className="uppercase bg-[var(--orange-main)] rounded-xl py-2 px-4">
                iniciar sesión
              </button>
            </div>
          </form>
        </div>
        <Link to="/iniciar-sesion">
          ¿Ya tienes cuenta? <span className="underline">Inicia Sesión</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
