import { Link } from "react-router-dom";
import { useAuth } from '@/features/auth/hooks/useAuth';

const ProfilePage = () => {
  const { user } = useAuth();

  // Función para formatear la fecha de forma bonita (ej: "21 de febrero de 2026")
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Desconocida';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Función para traducir el rol a español
  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'CUSTOMER': return { text: 'Cliente', color: 'bg-blue-100 text-blue-700' };
      case 'ORGANIZER': return { text: 'Organizador', color: 'bg-purple-100 text-purple-700' };
      case 'ADMIN': return { text: 'Administrador', color: 'bg-red-100 text-red-700' };
      default: return { text: role || 'Usuario', color: 'bg-gray-100 text-gray-700' };
    }
  };

  const roleInfo = getRoleBadge(user?.roleType);

  return (
    <div className="container mx-auto px-4 py-8">
       {/* Cabecera del Perfil */}
       <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6 mb-8">
           <div className="w-24 h-24 rounded-full bg-[#0B4D6C] text-white border-4 border-white shadow-md flex items-center justify-center relative text-4xl font-bold uppercase">
               {user?.name?.charAt(0) || 'U'}
           </div>
           <div className="text-center md:text-left flex-1">
               <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                   <h1 className="text-2xl font-bold text-gray-800">{user?.name || 'Cargando...'}</h1>
                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${roleInfo.color}`}>
                       {roleInfo.text}
                   </span>
               </div>
               <p className="text-gray-500 text-sm">
                   <i className="fa-regular fa-calendar-check mr-2"></i>
                   Miembro desde el {formatDate(user?.createdAt)}
               </p>
           </div>
           
           {/* Estado de la cuenta */}
           <div className="flex flex-col items-center md:items-end">
               <span className="text-sm text-gray-500 mb-1">Estado de cuenta</span>
               {user?.enabled ? (
                   <span className="flex items-center gap-2 text-green-600 font-semibold bg-green-50 px-4 py-2 rounded-lg">
                       <i className="fa-solid fa-circle-check"></i> Activa
                   </span>
               ) : (
                   <span className="flex items-center gap-2 text-red-600 font-semibold bg-red-50 px-4 py-2 rounded-lg">
                       <i className="fa-solid fa-circle-xmark"></i> Inactiva
                   </span>
               )}
           </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           {/* Menú Lateral */}
           <div className="lg:col-span-1">
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                   <nav className="flex flex-col">
                       <a href="#" className="flex items-center gap-3 px-6 py-4 bg-cyan-50 text-[#0B4D6C] font-semibold border-l-4 border-[#0B4D6C]">
                           <i className="fa-regular fa-id-card w-5 text-center"></i> Información Personal
                       </a>
                       <Link to="/bookings" className="flex items-center gap-3 px-6 py-4 text-gray-600 hover:bg-gray-50 hover:text-[#0B4D6C] transition border-l-4 border-transparent">
                           <i className="fa-solid fa-ticket w-5 text-center"></i> Mis Tickets
                       </Link>
                       {user?.roleType !== 'CUSTOMER' && (
                           <Link to="/my-events" className="flex items-center gap-3 px-6 py-4 text-gray-600 hover:bg-gray-50 hover:text-[#0B4D6C] transition border-l-4 border-transparent">
                               <i className="fa-regular fa-calendar-check w-5 text-center"></i> Mis Eventos
                           </Link>
                       )}
                   </nav>
               </div>
           </div>

           {/* Datos del Usuario */}
           <div className="lg:col-span-3 space-y-6">
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                   <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                       <h2 className="text-xl font-bold text-gray-800">Detalles de la Cuenta</h2>
                       <span className="text-sm text-gray-400">ID de Usuario: #{user?.id}</span>
                   </div>
                   
                   <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                           <div className="relative">
                               <input 
                                   type="text" 
                                   defaultValue={user?.name} 
                                   readOnly 
                                   className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-gray-700 outline-none cursor-default" 
                               />
                               <i className="fa-regular fa-user absolute left-3.5 top-3 text-gray-400"></i>
                           </div>
                       </div>
                       
                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                           <div className="relative">
                               <input 
                                   type="email" 
                                   defaultValue={user?.email} 
                                   readOnly 
                                   className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-gray-700 outline-none cursor-default" 
                               />
                               <i className="fa-regular fa-envelope absolute left-3.5 top-3 text-gray-400"></i>
                           </div>
                       </div>

                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Rol en el Sistema</label>
                           <div className="relative">
                               <input 
                                   type="text" 
                                   defaultValue={roleInfo.text} 
                                   readOnly 
                                   className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-gray-700 outline-none cursor-default" 
                               />
                               <i className="fa-solid fa-shield-halved absolute left-3.5 top-3 text-gray-400"></i>
                           </div>
                       </div>

                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Registro</label>
                           <div className="relative">
                               <input 
                                   type="text" 
                                   defaultValue={formatDate(user?.createdAt)} 
                                   readOnly 
                                   className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-gray-700 outline-none cursor-default" 
                               />
                               <i className="fa-regular fa-calendar absolute left-3.5 top-3 text-gray-400"></i>
                           </div>
                       </div>
                   </form>

                   <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-4 text-blue-800 text-sm">
                       <i className="fa-solid fa-circle-info mt-0.5"></i>
                       <p>
                           Para modificar tu nombre, correo o contraseña, por favor contacta con soporte técnico. Por motivos de seguridad, estas acciones requieren validación adicional.
                       </p>
                   </div>
               </div>
           </div>
       </div>
    </div>
  );
};

export default ProfilePage;