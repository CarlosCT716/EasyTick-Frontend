import { useEffect, useState } from 'react';
import EventCarousel from '../components/EventCarrousel';
import EventCard from '../components/EventCard';
import RecommendedEvents from '../components/RecommendedEvents';
import { getActiveEvents } from '@/features/events/api/EventsService';
import type { EventListResponse } from '@/features/events/models/Event';

const EventsPage = () => {
  const [events, setEvents] = useState<EventListResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // 🌟 Llama al endpoint público que creamos
        const data = await getActiveEvents();
        setEvents(data);
      } catch (err) {
        console.error('Error al traer eventos:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div className="text-center py-20">Cargando eventos...</div>;

  return (
    <>
      <EventCarousel events={events} />
      <main className="grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-10">
            <section>
              <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-2">
                <h2 className="font-bold text-2xl text-[#002940]">Nuevos Eventos</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
                {events.length === 0 && <p>No hay eventos disponibles actualmente.</p>}
              </div>
            </section>
            {events.length > 0 && <RecommendedEvents events={events} />}
          </div>
        </div>
      </main>
    </>
  );
};

export default EventsPage;