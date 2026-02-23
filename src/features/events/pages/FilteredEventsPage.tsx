import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { getActiveEvents, getAllCategories } from '@/features/events/api/EventsService';
import type { EventListResponse, EventCategory } from '@/features/events/models/Event';

const FilteredEventsPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [events, setEvents] = useState<EventListResponse[]>([]);
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [searchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsData, categoriesData] = await Promise.all([
          getActiveEvents(),
          getAllCategories()
        ]);
        setEvents(eventsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const currentCategory = categories.find(c => c.id.toString() === categoryId);

  const filteredEvents = events.filter(e => {
    const matchesCategory = (e as any).categoryId?.toString() === categoryId || e.category === currentCategory?.name;
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) return <div className="text-center py-20">Cargando eventos...</div>;

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6">
        <Link to="/" className="text-sm font-semibold text-gray-500 hover:text-[#0B4D6C] transition flex items-center gap-2 w-max">
          <i className="fa-solid fa-arrow-left"></i> Volver a la cartelera
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 border-b border-gray-200 pb-6 gap-4">
        <h1 className="font-bold text-3xl text-[#002940]">
          {currentCategory ? currentCategory.name : 'Categoría'}
        </h1>
        
        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
          
        
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-gray-100 mt-6">
          <i className="fa-solid fa-folder-open text-4xl text-gray-300 mb-4 block"></i>
          <h3 className="text-xl font-bold text-gray-700">No se encontraron resultados</h3>
          <p className="text-gray-500 mt-2">Intenta con otros términos o cambia de categoría.</p>
        </div>
      )}
    </main>
  );
};

export default FilteredEventsPage;