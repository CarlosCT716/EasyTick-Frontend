import { Link } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">

       <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6 mb-8">
           <div className="w-24 h-24 rounded-full bg-gray-100 border-4 border-white shadow-md flex items-center justify-center relative">
               <i className="fa-solid fa-user text-4xl text-gray-400"></i>
               <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#0B4D6C] rounded-full text-white flex items-center justify-center border-2 border-white hover:bg-cyan-700 transition">
                  <i className="fa-solid fa-camera text-xs"></i>
               </button>
           </div>
           <div className="text-center md:text-left flex-1">
               <h1 className="text-2xl font-bold text-gray-800">Carlos Correa</h1>
               <p className="text-gray-500">Miembro desde Enero 2026</p>
           </div>
           <div className="flex gap-3">
               <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-semibold transition">
                  Editar Perfil
               </button>
           </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           <div className="lg:col-span-1">
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                   <nav className="flex flex-col">
                       <a href="#" className="flex items-center gap-3 px-6 py-4 bg-cyan-50 text-[#0B4D6C] font-semibold border-l-4 border-[#0B4D6C]">
                           <i className="fa-regular fa-id-card w-5 text-center"></i> Información Personal
                       </a>
                       <Link to="/bookings" className="flex items-center gap-3 px-6 py-4 text-gray-600 hover:bg-gray-50 hover:text-[#0B4D6C] transition border-l-4 border-transparent">
                           <i className="fa-solid fa-ticket w-5 text-center"></i> Mis Tickets
                       </Link>
                       <a href="#" className="flex items-center gap-3 px-6 py-4 text-gray-600 hover:bg-gray-50 hover:text-[#0B4D6C] transition border-l-4 border-transparent">
                           <i className="fa-regular fa-credit-card w-5 text-center"></i> Pagos y Facturación
                       </a>
                       <a href="#" className="flex items-center gap-3 px-6 py-4 text-gray-600 hover:bg-gray-50 hover:text-[#0B4D6C] transition border-l-4 border-transparent">
                           <i className="fa-solid fa-gear w-5 text-center"></i> Configuración
                       </a>
                   </nav>
               </div>
           </div>

           <div className="lg:col-span-3 space-y-6">
               
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                   <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Información Personal</h2>
                   <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                           <input type="text" defaultValue="Carlos Correa" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#0B4D6C] focus:outline-none" />
                       </div>
                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                           <input type="email" defaultValue="carlos@easyticket.com" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#0B4D6C] focus:outline-none" />
                       </div>
                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                           <input type="tel" defaultValue="+51 987 654 321" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#0B4D6C] focus:outline-none" />
                       </div>
                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                           <input type="text" defaultValue="Lima, Perú" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#0B4D6C] focus:outline-none" />
                       </div>
                   </form>
                   <div className="mt-6 flex justify-end">
                       <button className="bg-[#0B4D6C] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#093d56] transition shadow-md">
                           Guardar Cambios
                       </button>
                   </div>
               </div>

               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                   <h2 className="text-xl font-bold text-gray-800 mb-4">Mis Últimos Tickets</h2>
                   
                   <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                       <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                           <img src="https://picsum.photos/seed/tech/100/100" className="w-full h-full object-cover"/>
                       </div>
                       <div className="flex-1">
                           <h4 className="font-bold text-gray-800">Tech Summit Lima 2026</h4>
                           <p className="text-sm text-gray-500">15 Feb • 09:00 AM</p>
                       </div>
                       <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Confirmado</span>
                   </div>

               </div>
           </div>
       </div>
    </div>
  );
};

export default ProfilePage;