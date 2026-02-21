import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface UserSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserSidebar = ({ isOpen, onClose }: UserSidebarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  if (!user) return null;

  return (
    <>
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      />

      <aside className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#0B4D6C] text-white">
          <h3 className="font-bold text-lg">Mi Cuenta</h3>
          <button onClick={onClose} className="hover:bg-white/20 rounded-full p-1 w-8 h-8 flex items-center justify-center transition">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className="p-6 flex flex-col items-center border-b border-gray-100 bg-gray-50">
             <div className="w-20 h-20 rounded-full bg-white border-4 border-[#0B4D6C] flex items-center justify-center text-[#0B4D6C] text-3xl shadow-sm mb-3 uppercase font-bold">
                 {user.name.charAt(0)}
             </div>
             <h4 className="font-bold text-gray-800 text-center">{user.name}</h4>
             <p className="text-xs text-gray-500 text-center">{user.email}</p>
        </div>

         <nav className="flex-1 overflow-y-auto py-4">
            <Link to="/profile" onClick={onClose} className="flex items-center gap-4 px-6 py-3 text-gray-600 hover:bg-cyan-50 hover:text-[#0B4D6C] transition border-l-4 border-transparent hover:border-[#0B4D6C]">
                <i className="fa-regular fa-id-card w-5 text-center"></i> Mi Perfil
            </Link>
            
            <Link to="/bookings" onClick={onClose} className="flex items-center gap-4 px-6 py-3 text-gray-600 hover:bg-cyan-50 hover:text-[#0B4D6C] transition border-l-4 border-transparent hover:border-[#0B4D6C]">
                <i className="fa-solid fa-ticket w-5 text-center"></i> Mis Tickets
            </Link>
<Link to="/my-events" onClick={onClose} className="flex items-center gap-4 px-6 py-3 text-gray-600 hover:bg-cyan-50 hover:text-[#0B4D6C] transition border-l-4 border-transparent hover:border-[#0B4D6C]">
                    <i className="fa-regular fa-calendar-check w-5 text-center"></i> Mis Eventos
                </Link>
            {user.roleType !== 'CUSTOMER' && (
              <>
                
                <Link to="/create-event" onClick={onClose} className="flex items-center gap-4 px-6 py-3 text-gray-600 hover:bg-cyan-50 hover:text-[#0B4D6C] transition border-l-4 border-transparent hover:border-[#0B4D6C]">
                    <i className="fa-solid fa-plus w-5 text-center"></i> Crear Evento
                </Link>
              </>
            )}
        </nav>

        <div className="p-6 border-t border-gray-100">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 text-red-600 font-semibold hover:bg-red-50 p-3 rounded-xl transition justify-center">
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Cerrar Sesión
            </button>
        </div>
      </aside>
    </>
  );
};

export default UserSidebar;