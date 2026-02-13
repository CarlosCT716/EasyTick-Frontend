import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex max-w-4xl w-full">
        
        <div className="w-full md:w-1/2 p-8 md:p-12">
           <div className="flex items-center gap-2 mb-8">
               <div className="w-8 h-8 rounded-full bg-[#0B4D6C] flex items-center justify-center text-white text-sm">
                   <i className="fa-solid fa-ticket"></i>
               </div>
               <span className="text-xl font-bold text-[#0B4D6C]">EasyTicket</span>
           </div>

           <h2 className="text-3xl font-bold text-gray-800 mb-2">¡Hola de nuevo!</h2>
           <p className="text-gray-500 mb-8">Ingresa tus datos para acceder a tu cuenta.</p>

           <form className="space-y-5">
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
                 <div className="flex justify-end mt-2">
                    <a href="#" className="text-xs font-semibold text-[#0B4D6C] hover:underline">¿Olvidaste tu contraseña?</a>
                 </div>
              </div>

              <button className="w-full bg-[#0B4D6C] hover:bg-[#093d56] text-white font-bold py-3 rounded-xl shadow-lg transition transform active:scale-95">
                 Iniciar Sesión
              </button>
           </form>

           <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                 ¿No tienes una cuenta? <Link to="/register" className="font-bold text-[#0B4D6C] hover:underline">Regístrate gratis</Link>
              </p>
           </div>
        </div>

        <div className="hidden md:block md:w-1/2 bg-[#0B4D6C] relative overflow-hidden">
           <div className="absolute inset-0 bg-linear-to-br from-[#0B4D6C]/90 to-black/50 z-10"></div>
           <img src="https://picsum.photos/seed/concert/800/1000" className="absolute inset-0 w-full h-full object-cover" />
           
           <div className="relative z-20 h-full flex flex-col justify-center px-12 text-white">
              <h3 className="text-4xl font-bold mb-4">Vive experiencias inolvidables</h3>
              <p className="text-lg opacity-90">Descubre los mejores conciertos, teatros y conferencias en un solo lugar.</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;