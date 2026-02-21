import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEventsByOrganizer, changeEventStatus } from '@/features/events/api/EventsService';
import { useAuth } from '@/features/auth/hooks/useAuth';
import type { EventListResponse } from '@/features/events/models/Event';

const MyEventsPage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<EventListResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchMyEvents();
  }, [user]);

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      const data = await getEventsByOrganizer(user!.id);
      setEvents(data);
    } catch (error) {
      console.error('Error al cargar mis eventos', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    // Si está ACTIVE lo pasamos a CANCELLED (Inactivo), y viceversa
    const newStatus = currentStatus === 'ACTIVE' ? 'CANCELLED' : 'ACTIVE';
    try {
      await changeEventStatus(id, newStatus);
      // Actualizamos la lista localmente
      setEvents(events.map(ev => ev.id === id ? { ...ev, eventStatus: newStatus } : ev));
    } catch (error) {
      console.error('Error al cambiar estado', error);
      alert('Error al cambiar el estado del evento');
    }
  };



  if (loading) return <div className="text-center py-20">Cargando tus eventos...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#002940]">Mis Eventos</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm">
                <th className="p-4 font-semibold">Evento</th>
                <th className="p-4 font-semibold">Fecha</th>
                <th className="p-4 font-semibold">Precio</th>
                <th className="p-4 font-semibold">Estado</th>
                <th className="p-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={event.imageUrl} alt={event.title} className="w-12 h-12 rounded object-cover" />
                      <div>
                        <p className="font-bold text-gray-800">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.category || 'Sin categoría'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(event.eventDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-sm text-gray-600">S/ {event.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      event.eventStatus === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {event.eventStatus === 'ACTIVE' ? 'ACTIVO' : 'INACTIVO'}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {/* Botón Activar/Desactivar */}
                    <button 
                      onClick={() => handleToggleStatus(event.id, event.eventStatus)}
                      title={event.eventStatus === 'ACTIVE' ? 'Desactivar' : 'Activar'}
                      className={`p-2 rounded transition ${event.eventStatus === 'ACTIVE' ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'}`}
                    >
                      <i className={`fa-solid ${event.eventStatus === 'ACTIVE' ? 'fa-pause' : 'fa-play'}`}></i>
                    </button>
                    
                    {/* Botón Editar */}
                    <Link to={`/edit-event/${event.id}`} className="inline-block p-2 text-[#0B4D6C] hover:bg-cyan-50 rounded transition">
                      <i className="fa-solid fa-pen"></i>
                    </Link>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No has creado ningún evento todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyEventsPage;