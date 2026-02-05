import { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  onOpenSidebar: () => void;
}

const Navbar = ({ onOpenSidebar }: NavbarProps) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const categoryBtnRef = useRef<HTMLButtonElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoryBtnRef.current && 
        !categoryBtnRef.current.contains(event.target as Node) &&
        categoryMenuRef.current && 
        !categoryMenuRef.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4 relative">

            <div className="flex items-center gap-6">
                <a href="#" className="flex items-center gap-2 group shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#0B4D6C] flex items-center justify-center text-white text-lg">
                        <i className="fa-solid fa-ticket"></i>
                    </div>
                    <h2 className="text-xl font-bold text-[#0B4D6C] tracking-tight group-hover:text-cyan-600 transition hidden sm:block">
                        EasyTicket
                    </h2>
                </a>

                <div className="relative">
                    <button 
                        id="btnCategories"
                        ref={categoryBtnRef}
                        onClick={(e) => { e.stopPropagation(); setIsCategoryOpen(!isCategoryOpen); }}
                        className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#0B4D6C] transition focus:outline-none px-3 py-2 rounded-lg hover:bg-gray-50"
                    >
                        <i className="fa-solid fa-layer-group"></i> Categorías
                        <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} id="catArrow"></i>
                    </button>
                    
                    {isCategoryOpen && (
                        <div 
                            id="categoryMenu" 
                            ref={categoryMenuRef}
                            className="absolute left-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 animate-fade-in origin-top-left"
                        >
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 rounded-lg">
                                <i className="fa-solid fa-music mr-2 text-gray-400"></i> Conciertos
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 rounded-lg">
                                <i className="fa-solid fa-masks-theater mr-2 text-gray-400"></i> Teatro
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 rounded-lg">
                                <i className="fa-solid fa-laptop-code mr-2 text-gray-400"></i> Tecnología
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 rounded-lg">
                                <i className="fa-solid fa-graduation-cap mr-2 text-gray-400"></i> Educación
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 max-w-xl hidden md:block relative">
                <input type="text" placeholder="Buscar eventos, artistas o lugares..."
                    className="w-full bg-gray-100 text-gray-700 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4D6C]/50 transition border border-transparent focus:bg-white focus:border-gray-200" />
                <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3 text-gray-400"></i>
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
                <button onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                    className="md:hidden w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100 flex items-center justify-center transition">
                    <i className="fa-solid fa-magnifying-glass text-lg"></i>
                </button>

                <a href="#" className="hidden sm:flex items-center gap-2 bg-[#0B4D6C] hover:bg-[#093d56] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap">
                    <i className="fa-solid fa-plus"></i> <span className="hidden lg:inline">Crear Evento</span><span className="lg:hidden">Crear</span>
                </a>

                <button onClick={onOpenSidebar} className="flex items-center gap-2 focus:outline-none group pl-2">
                    <div className="text-right hidden lg:block">
                        <p className="text-sm font-bold text-gray-700 group-hover:text-[#0B4D6C] transition">Carlos Correa</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center text-gray-500 overflow-hidden hover:ring-2 hover:ring-[#0B4D6C] transition relative">
                        <i className="fa-regular fa-user text-lg"></i>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                </button>
            </div>
        </div>

        {isMobileSearchOpen && (
            <div id="mobileSearch" className="absolute top-full left-0 w-full bg-white p-4 shadow-md border-t border-gray-100 animate-slide-down md:hidden">
                <div className="relative">
                    <input type="text" placeholder="Buscar..."
                        className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4D6C]" />
                    <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-gray-400"></i>
                </div>
            </div>
        )}
    </header>
  );
};

export default Navbar;