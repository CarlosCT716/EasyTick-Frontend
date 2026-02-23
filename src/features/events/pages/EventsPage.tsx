import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import EventCarousel from '../components/EventCarrousel';
import EventCard from '../components/EventCard';
import RecommendedEvents from '../components/RecommendedEvents';
import { getActiveEvents } from '@/features/events/api/EventsService';
import type { EventListResponse } from '@/features/events/models/Event';

const EventsPage = () => {
  const [events, setEvents] = useState<EventListResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getActiveEvents();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const displayEvents = searchTerm ? filteredEvents : filteredEvents.slice(0, 6);

  if (loading) return <div className="text-center py-20">Cargando eventos...</div>;

  return (
    <>
      <EventCarousel events={events.slice(0, 5)} />
      <main className="grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Contenido Principal */}
          <div className="lg:col-span-3 space-y-10">
            <section>
              <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-2">
                <h2 className="font-bold text-2xl text-[#002940]">
                  {searchTerm ? `Resultados para "${searchTerm}"` : 'Nuevos Eventos'}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              {displayEvents.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  No se encontraron eventos.
                </div>
              )}
            </section>
            {events.length > 0 && !searchTerm && <RecommendedEvents events={events} />}
          </div>

          <aside className="lg:block">
            <div className="sticky top-24 space-y-6">
              
              <div className="bg-[#0B4D6C] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">¿Organizas un evento?</h3>
                  <p className="text-cyan-100 text-sm mb-4">
                    Publica tu evento con nosotros y llega a miles de personas en segundos.
                  </p>
                  <button className="w-full bg-white text-[#0B4D6C] font-bold py-2 px-4 rounded-lg hover:bg-cyan-50 transition duration-300">
                    Empezar ahora
                  </button>
                </div>
                <i className="fa-solid fa-bolt absolute -right-4 -bottom-4 text-6xl text-white/10 -rotate-12 group-hover:scale-110 transition-transform"></i>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=500&auto=format&fit=crop" 
                  alt="Publicidad" 
                  className="w-full h-40 object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Publicidad</span>
                  <p className="text-sm font-medium text-gray-600 mt-1">Vive las mejores experiencias con EasyTicket.</p>
                </div>
              </div>

              <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <i className="fa-solid fa-crown text-yellow-400"></i>
                  <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">EasyTicket Plus</span>
                </div>
                <h4 className="font-bold text-lg mb-2">Acceso Anticipado</h4>
                <p className="text-gray-300 text-xs mb-4">Suscríbete para recibir preventas exclusivas y descuentos en entradas seleccionadas.</p>
                <input 
                  type="email" 
                  placeholder="Tu correo aquí" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-yellow-400 mb-2"
                />
                <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 rounded-lg text-xs transition">
                  Suscribirme
                </button>
              </div>

            </div>
          </aside>

        </div>
      </main>
    </>
  );
};

export default EventsPage;