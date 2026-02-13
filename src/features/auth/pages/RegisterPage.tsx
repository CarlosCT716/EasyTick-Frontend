import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex max-w-5xl w-full">
        
        <div className="hidden md:block md:w-1/2 bg-[#0B4D6C] relative overflow-hidden">
           <div className="absolute inset-0 bg-linear-to-tr from-[#0B4D6C]/80 to-purple-900/40 z-10"></div>
           <img src="https://picsum.photos/seed/crowd/800/1000" className="absolute inset-0 w-full h-full object-cover" />
           
           <div className="relative z-20 h-full flex flex-col justify-between p-12 text-white">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-sm">
                     <i className="fa-solid fa-ticket"></i>
                 </div>
                 <span className="font-bold tracking-wide">EasyTicket</span>
              </div>
              
              <div>
                  <h3 className="text-4xl font-bold mb-4 leading-tight">Únete a la comunidad más grande de eventos</h3>
                  <p className="text-lg opacity-90">Crea tu cuenta gratis y empieza a descubrir experiencias únicas hoy mismo.</p>
              </div>
           </div>
        </div>

        {/* Lado Derecho: Formulario */}
        <div className="w-full md:w-1/2 p-8 md:p-12 relative">
           <Link to="/" className="absolute top-6 right-6 text-gray-400 hover:text-[#0B4D6C] transition">
              <i className="fa-solid fa-xmark text-xl"></i>
           </Link>

           <h2 className="text-3xl font-bold text-gray-800 mb-2">Crear Cuenta</h2>
           <p className="text-gray-500 mb-8">Completa el formulario para registrarte.</p>

           <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                     <input type="text" placeholder="Carlos" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B4D6C]" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                     <input type="text" placeholder="Correa" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B4D6C]" />
                  </div>
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                 <div className="relative">
                    <input type="email" placeholder="ejemplo@correo.com" 
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B4D6C] focus:bg-white transition"
                    />
                    <i className="fa-regular fa-envelope absolute left-3.5 top-3.5 text-gray-400"></i>
                 </div>
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                 <div className="relative">
                    <input type="password" placeholder="••••••••" 
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B4D6C] focus:bg-white transition"
                    />
                    <i className="fa-solid fa-lock absolute left-3.5 top-3.5 text-gray-400"></i>
                 </div>
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
                 <div className="relative">
                    <input type="password" placeholder="••••••••" 
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B4D6C] focus:bg-white transition"
                    />
                    <i className="fa-solid fa-check-double absolute left-3.5 top-3.5 text-gray-400"></i>
                 </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                 <input type="checkbox" id="terms" className="rounded text-[#0B4D6C] focus:ring-[#0B4D6C]" />
                 <label htmlFor="terms" className="text-sm text-gray-500">
                    Acepto los <a href="#" className="text-[#0B4D6C] font-semibold hover:underline">Términos y Condiciones</a>
                 </label>
              </div>

              <button className="w-full bg-[#0B4D6C] hover:bg-[#093d56] text-white font-bold py-3 rounded-xl shadow-lg transition transform active:scale-95 mt-4">
                 Registrarme
              </button>
           </form>

           <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                 ¿Ya tienes una cuenta? <Link to="/login" className="font-bold text-[#0B4D6C] hover:underline">Inicia Sesión</Link>
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;