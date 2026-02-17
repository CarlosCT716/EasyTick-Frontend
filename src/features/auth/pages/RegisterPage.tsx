import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '@/features/auth/api/authService';
import { UserRole } from '@/features/auth/models/authTypes';

const RegisterPage = () => {
  const navigate = useNavigate();
  
  // Estados para los campos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  // Estados para errores y loading
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!termsAccepted) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    try {
      setLoading(true);

      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        roleType: UserRole.CUSTOMER,
      });

      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      navigate('/login');
      
    } catch (err: any) {
      if (err.response?.data) {
        setError(err.response.data.message || err.response.data);
      } else {
        setError('Error al registrar usuario. Intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex max-w-5xl w-full">
        
        <div className="hidden md:block md:w-1/2 bg-[#0B4D6C] relative overflow-hidden">
           <div className="absolute inset-0 bg-linear-to-tr from-[#0B4D6C]/80 to-purple-900/40 z-10"></div>
           <img src="https://picsum.photos/seed/crowd/800/1000" className="absolute inset-0 w-full h-full object-cover" alt="Events" />
           
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

        <div className="w-full md:w-1/2 p-8 md:p-12 relative">
           <Link to="/" className="absolute top-6 right-6 text-gray-400 hover:text-[#0B4D6C] transition">
              <i className="fa-solid fa-xmark text-xl"></i>
           </Link>

           <h2 className="text-3xl font-bold text-gray-800 mb-2">Crear Cuenta</h2>
           <p className="text-gray-500 mb-8">Completa el formulario para registrarte.</p>

           {error && (
             <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
               {error}
             </div>
           )}

           <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                 <input 
                   type="text" 
                   name="name"
                   value={formData.name}
                   onChange={handleChange}
                   placeholder="Juan Pérez" 
                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B4D6C]" 
                 />
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                 <div className="relative">
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ejemplo@correo.com" 
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B4D6C] focus:bg-white transition"
                    />
                    <i className="fa-regular fa-envelope absolute left-3.5 top-3.5 text-gray-400"></i>
                 </div>
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                 <div className="relative">
                    <input 
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••" 
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B4D6C] focus:bg-white transition"
                    />
                    <i className="fa-solid fa-lock absolute left-3.5 top-3.5 text-gray-400"></i>
                 </div>
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
                 <div className="relative">
                    <input 
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••" 
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B4D6C] focus:bg-white transition"
                    />
                    <i className="fa-solid fa-check-double absolute left-3.5 top-3.5 text-gray-400"></i>
                 </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                 <input 
                   type="checkbox" 
                   id="terms" 
                   checked={termsAccepted}
                   onChange={(e) => setTermsAccepted(e.target.checked)}
                   className="rounded text-[#0B4D6C] focus:ring-[#0B4D6C]" 
                 />
                 <label htmlFor="terms" className="text-sm text-gray-500">
                    Acepto los <a href="#" className="text-[#0B4D6C] font-semibold hover:underline">Términos y Condiciones</a>
                 </label>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#0B4D6C] hover:bg-[#093d56] text-white font-bold py-3 rounded-xl shadow-lg transition transform active:scale-95 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                 {loading ? 'Registrando...' : 'Registrarme'}
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