import { useState, useEffect, useRef } from 'react';
import { Link,  useSearchParams } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { getAllCategories } from '@/features/events/api/EventsService';
import type { EventCategory } from '@/features/events/models/Event';

interface NavbarProps {
  onOpenSidebar: () => void;
}

const Navbar = ({ onOpenSidebar }: NavbarProps) => {
  const { user, isAuthenticated } = useAuth();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
 
  
  const categoryBtnRef = useRef<HTMLButtonElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error cargando categorías:", err);
      }
    };
    fetchCats();

    function handleClickOutside(event: MouseEvent) {
      if (
        categoryBtnRef.current && !categoryBtnRef.current.contains(event.target as Node) &&
        categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ search: value });
    } else {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-6">
                <Link to="/" className="flex items-center gap-2 group shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#0B4D6C] flex items-center justify-center text-white text-lg">
                        <i className="fa-solid fa-ticket"></i>
                    </div>
                    <h2 className="text-xl font-bold text-[#0B4D6C] tracking-tight group-hover:text-cyan-600 transition hidden sm:block">
                        EasyTicket
                    </h2>
                </Link>

                <div className="relative">
                    <button 
                        ref={categoryBtnRef}
                        onClick={(e) => { e.stopPropagation(); setIsCategoryOpen(!isCategoryOpen); }}
                        className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#0B4D6C] transition px-3 py-2 rounded-lg hover:bg-gray-50"
                    >
                        <i className="fa-solid fa-layer-group"></i> Categorías
                        <i className={`fa-solid fa-chevron-down text-xs transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}></i>
                    </button>
                    
                    {isCategoryOpen && (
                        <div ref={categoryMenuRef} className="absolute left-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50">
                            <Link 
                                to="/" 
                                onClick={() => setIsCategoryOpen(false)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 rounded-lg"
                            >
                                <i className="fa-solid fa-border-all mr-2 text-gray-400"></i> Todas
                            </Link>
                            {categories.map(cat => (
                                <Link 
                                    key={cat.id} 
                                    to={`/category/${cat.id}`} 
                                    onClick={() => setIsCategoryOpen(false)}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 rounded-lg"
                                >
                                    <i className="fa-solid fa-tag mr-2 text-gray-400"></i> {cat.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 max-w-xl hidden md:block relative">
                <input 
                    type="text" 
                    placeholder="Buscar eventos..." 
                    value={searchParams.get('search') || ''}
                    onChange={handleSearch}
                    className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4D6C]/50" 
                />
                <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3 text-gray-400"></i>
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
                {isAuthenticated && (
                  <Link to="/create-event" className="hidden sm:flex items-center gap-2 bg-[#0B4D6C] hover:bg-[#093d56] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition">
                    <i className="fa-solid fa-plus"></i>
                    <span>Crear Evento</span>
                  </Link>
                )}

                {isAuthenticated ? (
                  <button onClick={onOpenSidebar} className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition">
                    <div className="w-8 h-8 rounded-full bg-[#0B4D6C] flex items-center justify-center text-white font-semibold uppercase">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="font-medium text-gray-700 hidden sm:block">{user?.name}</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link to="/login" className="text-gray-700 hover:text-[#0B4D6C] font-medium transition">Ingresar</Link>
                    <Link to="/register" className="bg-[#0B4D6C] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#093d56] transition">Registro</Link>
                  </div>
                )}
            </div>
        </div>
    </header>
  );
};

export default Navbar;