const Footer = () => {
  return (
    <footer className="bg-[#1a202c] text-gray-300 py-12 mt-auto">
      <div className="container mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-full bg-[#0B4D6C] flex items-center justify-center text-sm">
                <i className="fa-solid fa-ticket"></i>
              </div>
              <h3 className="text-xl font-bold">EasyTicket</h3>
            </div>

            <div className="flex gap-4 mt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#0B4D6C] hover:text-white transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 hover:text-white transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Descubre</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-cyan-400 transition">Eventos presenciales</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Eventos virtuales</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Organiza</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-cyan-400 transition">Crear evento</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Precios</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contáctanos</h3>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Correo electrónico"
                className="bg-gray-800 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4D6C] text-sm border border-gray-700"
              />
              <button className="bg-[#0B4D6C] hover:bg-cyan-700 text-white font-bold py-2.5 rounded-lg transition shadow-lg text-sm">
                Enviar
              </button>
            </form>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>&copy; 2026 EasyTicket. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacidad</a>
            <a href="#" className="hover:text-white">Términos</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
