import EventCarousel from '../components/EventCarrousel';
import EventCard from '../components/EventCard';
import RecommendedEvents from '../components/RecommendedEvents';

const EventsPage = () => {
  return (
    <>
      <EventCarousel />

      <main className="grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-3 space-y-10">
             
             <section>
                <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-2">
                   <h2 className="font-bold text-2xl text-[#002940]">Nuevos Eventos</h2>
                   <a href="#" className="text-sm font-semibold text-[#0B4D6C] hover:text-cyan-600 flex items-center gap-1 transition">
                       Ver todos <i className="fa-solid fa-arrow-right text-xs"></i>
                   </a>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                   <EventCard
                     id={1}
                      image="https://picsum.photos/seed/m1/400/200"
                      category="Académico"
                      title="Matemática I - Repaso"
                      date="16 Feb"
                      location="Campus Central"
                      price={20.00}
                      month="FEB"
                      day="16"
                   />
                   <EventCard 
                     id={2}
                      image="https://picsum.photos/seed/hp/400/200"
                      category="Taller"
                      title="Habilidades Blandas"
                      location="Online vía Zoom"
                      price={0.00}
                      month="FEB"
                      day="18"
                      date="18 Feb"
                   />
                   <EventCard 
                        id={3}
                      image="https://picsum.photos/seed/dev/400/200"
                      category="Tecnología"
                      title="Intro a React & Tailwind"
                      location="Auditorio B"
                      price={35.00}
                      month="MAR"
                      day="02"
                      date="02 Mar"
                   />
                </div>
             </section>
+
             <RecommendedEvents />

          </div>

          <aside className="hidden lg:block lg:col-span-1 space-y-6 sticky top-24 h-fit">
             <div className="bg-linear-to-br from-[#0B4D6C] to-cyan-700 rounded-2xl p-6 text-white text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                    <i className="fa-solid fa-star text-9xl"></i>
                </div>
                <p className="text-xs font-bold tracking-widest uppercase opacity-80 mb-2">Publicidad</p>
                <h3 className="text-xl font-bold mb-4">¡Publica tu evento aquí!</h3>
                <p className="text-sm mb-6 text-cyan-100">Llega a miles de personas y llena tu aforo.</p>
                <button className="bg-white text-[#0B4D6C] font-bold py-2 px-6 rounded-full text-sm hover:bg-gray-100 transition shadow-md w-full">Más información</button>
             </div>

             <div className="rounded-2xl overflow-hidden shadow-md group cursor-pointer relative h-100">
                 <img src="https://picsum.photos/seed/ad/400/800" className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                    <span className="bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded w-fit mb-2">PROMOCIONADO</span>
                    <h4 className="text-white font-bold text-lg">Curso Fullstack Java</h4>
                    <p className="text-gray-300 text-xs mt-1">Domina Spring Boot y Angular</p>
                 </div>
             </div>
          </aside>

          <div className="lg:hidden col-span-1">
              <div className="bg-gray-100 rounded-xl p-4 text-center text-gray-500 text-sm border-2 border-dashed border-gray-300">
                  Espacio Publicitario
              </div>
          </div>

        </div>
      </main>
    </>
  );
};

export default EventsPage;