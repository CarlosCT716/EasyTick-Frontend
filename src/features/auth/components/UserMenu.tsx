import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useState } from 'react';

const UserMenu = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-3">
        <Link 
          to="/login" 
          className="text-gray-700 hover:text-[#0B4D6C] font-medium transition"
        >
          Iniciar Sesión
        </Link>
        <Link 
          to="/register" 
          className="bg-[#0B4D6C] hover:bg-[#093d56] text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Registrarse
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
      >
        <div className="w-8 h-8 rounded-full bg-[#0B4D6C] flex items-center justify-center text-white font-semibold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium text-gray-700">{user?.name}</span>
        <i className="fa-solid fa-chevron-down text-xs text-gray-500"></i>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="font-semibold text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <p className="text-xs text-[#0B4D6C] mt-1">
              {user?.roleType === 'CUSTOMER' && '👤 Cliente'}
              {user?.roleType === 'ORGANIZER' && '🎭 Organizador'}
              {user?.roleType === 'ADMIN' && '⚙️ Administrador'}
            </p>
          </div>

          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700 transition"
            onClick={() => setShowDropdown(false)}
          >
            <i className="fa-solid fa-user w-5"></i>
            <span>Mi Perfil</span>
          </Link>

          <Link
            to="/bookings"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700 transition"
            onClick={() => setShowDropdown(false)}
          >
            <i className="fa-solid fa-ticket w-5"></i>
            <span>Mis Reservas</span>
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700 transition"
            onClick={() => setShowDropdown(false)}
          >
            <i className="fa-solid fa-user w-5"></i>
            <span>Mis Eventos</span>
          </Link>

          <hr className="my-2" />

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 transition"
          >
            <i className="fa-solid fa-right-from-bracket w-5"></i>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;