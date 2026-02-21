import { useEffect, useState } from 'react';
import EventCarousel from '../components/EventCarrousel';
import EventCard from '../components/EventCard';
import RecommendedEvents from '../components/RecommendedEvents';
import { getAllEvents } from '@/features/events/api/EventsService';
import type { EventListResponse } from '@/features/events/models/Event';

const EventsPage = () => {
  const [events, setEvents] = useState<EventListResponse[]>([]);

  useEffect(() => {
   //reisar el token 
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (err) {
        console.error('Error al traer eventos:', err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <>

<EventCarousel events={events} />
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
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>

            <RecommendedEvents events={events} />
          </div>

          <aside className="hidden lg:block lg:col-span-1 space-y-6 sticky top-24 h-fit">
            {/* publicidad */}
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