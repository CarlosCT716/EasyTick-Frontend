import { useRef, useEffect } from 'react';

const EventCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: number) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.85;
      carouselRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scroll(1);
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#0B4D6C] py-8 relative group">
      <div className="container mx-auto px-4 relative">

        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 hide-scroll-bar scroll-smooth"
        >
          <div className="snap-center shrink-0 w-[85%] md:w-150 h-75 bg-gray-800 rounded-2xl relative overflow-hidden shadow-lg group cursor-pointer">
            <img
              src="https://picsum.photos/seed/tech/800/400"
              className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-500"
            />
            <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/90 to-transparent p-6">
              <span className="bg-cyan-500 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
                Tecnología
              </span>
              <h3 className="text-2xl font-bold text-white mb-1">
                Tech Summit Lima 2026
              </h3>
            </div>
          </div>
            <div className="snap-center shrink-0 w-[85%] md:w-150 h-75 bg-gray-800 rounded-2xl relative overflow-hidden shadow-lg group cursor-pointer">
          <img
            src="https://picsum.photos/seed/music/800/400"
            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-500"
          />
          <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/90 to-transparent p-6">
            <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
              Música
            </span>
            <h3 className="text-2xl font-bold text-white mb-1">
              Festival de Rock Indie
            </h3>
            <p className="text-gray-300 text-sm">
              <i className="fa-regular fa-calendar mr-2"></i>
              20 Mar - Arena 1
            </p>
          </div>
        </div>

        <div className="snap-center shrink-0 w-[85%] md:w-150 h-75 bg-gray-800 rounded-2xl relative overflow-hidden shadow-lg group cursor-pointer">
          <img
            src="https://picsum.photos/seed/edu/800/400"
            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-500"
          />
          <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/90 to-transparent p-6">
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
              Educación
            </span>
            <h3 className="text-2xl font-bold text-white mb-1">
              Workshop de Diseño UX/UI
            </h3>
            <p className="text-gray-300 text-sm">
              <i className="fa-regular fa-calendar mr-2"></i>
              05 Abr - Virtual
            </p>
          </div>
        </div>

        <div className="snap-center shrink-0 w-[85%] md:w-150 h-75 bg-gray-800 rounded-2xl relative overflow-hidden shadow-lg group cursor-pointer">
          <img
            src="https://picsum.photos/seed/food/800/400"
            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-500"
          />
          <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/90 to-transparent p-6">
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
              Gastronomía
            </span>
            <h3 className="text-2xl font-bold text-white mb-1">
              Feria Sabor Peruano
            </h3>
            <p className="text-gray-300 text-sm">
              <i className="fa-regular fa-calendar mr-2"></i>
              10 May - Parque Expo
            </p>
          </div>
        </div>
        </div>

      

        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-r-xl text-white hover:bg-white/30 hidden md:block z-10"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 p-3 rounded-l-xl text-white hover:bg-white/30 hidden md:block z-10"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>

      </div>
    </section>
  );
};

export default EventCarousel;
