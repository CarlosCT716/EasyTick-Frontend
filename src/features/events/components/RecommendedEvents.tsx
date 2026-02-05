import { useRef } from 'react';

const RecommendedEvents = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollRecommended = (direction: number) => {
    if (containerRef.current) {
        // Lógica idéntica a tu script: ancho tarjeta + gap (16px)
        const firstCard = containerRef.current.firstElementChild as HTMLElement;
        const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 300; 
        const gap = 16;
        const scrollAmount = cardWidth + gap;

        containerRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section>
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-2">
            <h2 className="font-bold text-2xl text-[#002940]">Te podrían gustar</h2>
        </div>

        <div 
            id="recommendedContainer" 
            ref={containerRef}
            className="grid grid-rows-2 grid-flow-col gap-4 overflow-x-auto hide-scroll-bar scroll-smooth snap-x snap-mandatory h-125 pb-2 auto-cols-[85%] md:auto-cols-[calc(50%-8px)] lg:auto-cols-[calc(33.33%-11px)]"
        >
            {/* Tarjeta 1 */}
            <div className="snap-start bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition cursor-pointer flex flex-col h-full">
                <div className="h-32 bg-gray-200 relative shrink-0">
                    <img src="https://picsum.photos/seed/art/300/200" className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-gray-700">Cultura</span>
                </div>
                <div className="p-3 flex flex-col grow justify-between">
                    <div>
                        <h4 className="font-bold text-gray-800 leading-tight mb-1">Arte Moderno Expo</h4>
                        <p className="text-xs text-gray-500">Museo MAC • 25 Feb</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-semibold text-green-600">S/ 15.00</span>
                        <i className="fa-regular fa-heart text-gray-400 hover:text-red-500 transition"></i>
                    </div>
                </div>
            </div>

             {/* Tarjeta 2 */}
             <div className="snap-start bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition cursor-pointer flex flex-col h-full">
                <div className="h-32 bg-gray-200 relative shrink-0">
                    <img src="https://picsum.photos/seed/food/300/200" className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-gray-700">Gastronomía</span>
                </div>
                <div className="p-3 flex flex-col grow justify-between">
                    <div>
                        <h4 className="font-bold text-gray-800 leading-tight mb-1">Feria Gastronómica</h4>
                        <p className="text-xs text-gray-500">Parque Expo • 10 Mar</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-semibold text-green-600">S/ 10.00</span>
                        <i className="fa-regular fa-heart text-gray-400 hover:text-red-500 transition"></i>
                    </div>
                </div>
            </div>
            
            {/* Tarjeta 3 */}
            <div className="snap-start bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition cursor-pointer flex flex-col h-full">
                <div className="h-32 bg-gray-200 relative shrink-0">
                    <img src="https://picsum.photos/seed/rock/300/200" className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-gray-700">Concierto</span>
                </div>
                <div className="p-3 flex flex-col grow justify-between">
                    <div>
                        <h4 className="font-bold text-gray-800 leading-tight mb-1">Noche de Rock 80s</h4>
                        <p className="text-xs text-gray-500">Barranco Bar • 28 Feb</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-semibold text-green-600">S/ 45.00</span>
                        <i className="fa-regular fa-heart text-gray-400 hover:text-red-500 transition"></i>
                    </div>
                </div>
            </div>
            
            {/* Tarjeta 4 */}
            <div className="snap-start bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition cursor-pointer flex flex-col h-full">
                <div className="h-32 bg-gray-200 relative shrink-0">
                    <img src="https://picsum.photos/seed/tech2/300/200" className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-gray-700">Tecnología</span>
                </div>
                <div className="p-3 flex flex-col grow justify-between">
                    <div>
                        <h4 className="font-bold text-gray-800 leading-tight mb-1">IA para Todos</h4>
                        <p className="text-xs text-gray-500">Virtual • 15 Mar</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-semibold text-green-600">Gratis</span>
                        <i className="fa-regular fa-heart text-gray-400 hover:text-red-500 transition"></i>
                    </div>
                </div>
            </div>

             {/* Tarjeta 5 */}
             <div className="snap-start bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition cursor-pointer flex flex-col h-full">
                <div className="h-32 bg-gray-200 relative shrink-0">
                    <img src="https://picsum.photos/seed/sport/300/200" className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-gray-700">Deporte</span>
                </div>
                <div className="p-3 flex flex-col grow justify-between">
                    <div>
                        <h4 className="font-bold text-gray-800 leading-tight mb-1">Maratón Lima 10K</h4>
                        <p className="text-xs text-gray-500">Miraflores • 02 Abr</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-semibold text-green-600">S/ 60.00</span>
                        <i className="fa-regular fa-heart text-gray-400 hover:text-red-500 transition"></i>
                    </div>
                </div>
            </div>

            {/* Tarjeta 6 */}
            <div className="snap-start bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition cursor-pointer flex flex-col h-full">
                <div className="h-32 bg-gray-200 relative shrink-0">
                    <img src="https://picsum.photos/seed/theater/300/200" className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-gray-700">Teatro</span>
                </div>
                <div className="p-3 flex flex-col grow justify-between">
                    <div>
                        <h4 className="font-bold text-gray-800 leading-tight mb-1">Hamlet: El Retorno</h4>
                        <p className="text-xs text-gray-500">Teatro Nacional • 20 Abr</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-semibold text-green-600">S/ 30.00</span>
                        <i className="fa-regular fa-heart text-gray-400 hover:text-red-500 transition"></i>
                    </div>
                </div>
            </div>

        </div>

        <div className="flex justify-center gap-4 mt-4">
            <button onClick={() => scrollRecommended(-1)}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-[#0B4D6C] hover:text-white shadow-sm flex items-center justify-center transition active:scale-95 z-10">
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button onClick={() => scrollRecommended(1)}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-[#0B4D6C] hover:text-white shadow-sm flex items-center justify-center transition active:scale-95 z-10">
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    </section>
  );
};

export default RecommendedEvents;