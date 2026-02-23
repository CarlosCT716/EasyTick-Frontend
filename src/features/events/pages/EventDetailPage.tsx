import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventById } from '@/features/events/api/EventsService';
import type { EventResponse } from '@/features/events/models/Event';

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);

      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err: any) {
        console.error('Error al traer el evento:', err);
        setError('No se pudo cargar el evento. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-gray-500"><i className="fa-solid fa-circle-notch fa-spin text-4xl mb-4"></i><br/>Cargando evento...</div>;
  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;
  if (!event) return <p className="text-gray-600 text-center mt-8">Evento no encontrado.</p>;

  // 🚀 LÓGICA DEL MAPA: Coordenadas precisas o búsqueda por nombre
  const mapQuery = (event.latitud && event.longitud) 
    ? `${event.latitud},${event.longitud}` 
    : encodeURIComponent(event.location || 'Perú');

  const googleMapsUrl = `https://maps.google.com/maps?q=${mapQuery}&hl=es&z=16&output=embed`;

  return (
    <>
      {/* Fondo con blur */}
      <div className="relative h-125 w-full overflow-hidden" style={{ height: '500px' }}>
        <div
          className="absolute inset-0 bg-cover bg-center blur-xl scale-110 opacity-50"
          style={{ backgroundImage: `url(${event.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent" />

        <div className="container mx-auto px-4 h-full flex items-end pb-12 relative z-10">
          <div className="text-white max-w-3xl">
            <Link
              to="/"
              className="inline-flex items-center text-gray-300 hover:text-white mb-4 transition text-sm font-semibold"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i> Volver a eventos
            </Link>

            <div className="flex items-center gap-3 mb-3">
              <span className="text-gray-300 text-sm font-medium">
                <i className="fa-regular fa-user mr-1"></i> Por {event.organizerId}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{event.title}</h1>

            <p className="text-lg text-gray-200 flex items-center gap-4">
              <span>
                <i className="fa-regular fa-calendar mr-2"></i>
                {new Date(event.eventDate).toLocaleDateString('es-PE', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span>
                <i className="fa-regular fa-clock mr-2"></i>
                {new Date(event.eventDate).toLocaleTimeString('es-PE', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Descripción y ubicación */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-[#0B4D6C] mb-4">Sobre el evento</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{event.description}</p>

              <div className="flex justify-between items-center mt-8 mb-4">
                <h3 className="text-xl font-bold text-[#0B4D6C]">Ubicación</h3>
                {event.location && (
                  <span className="text-gray-500 font-medium bg-gray-50 px-3 py-1 rounded-lg text-sm border border-gray-100">
                    <i className="fa-solid fa-location-dot text-[#0B4D6C] mr-2"></i>
                    {event.location}
                  </span>
                )}
              </div>
              
              <div className="bg-gray-100 h-80 rounded-xl overflow-hidden shadow-inner border border-gray-200" style={{ height: '320px' }}>
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src={googleMapsUrl}
                  title={`Mapa de ${event.title}`}
                  className="w-full h-full"
                ></iframe>
              </div>
              
              {(event.latitud && event.longitud) && (
                <p className="text-xs text-gray-400 mt-2 text-right">
                  Coordenadas: {event.latitud}, {event.longitud}
                </p>
              )}
            </div>
          </div>

          {/* Precio y acción de compra */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 sticky top-24 space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Precio por entrada</p>
                  <span className="text-3xl font-bold text-gray-800">
                    {event.price > 0 ? `S/ ${event.price.toFixed(2)}` : 'Gratis'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                    Disponibles
                  </span>
                </div>
              </div>

              {event.eventStatus === 'ACTIVE' ? (
                <Link
                  to={`/checkout/${event.id}`}
                  className="w-full bg-[#0B4D6C] hover:bg-[#093d56] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition transform active:scale-95 flex justify-center items-center gap-2 text-lg"
                >
                  <i className="fa-solid fa-ticket"></i> Comprar Entradas
                </Link>
              ) : (
                <div className="w-full bg-gray-200 text-gray-500 font-bold py-4 rounded-xl flex justify-center items-center gap-2 text-lg cursor-not-allowed">
                  <i className="fa-solid fa-lock"></i> Evento Agotado/Cerrado
                </div>
              )}

              <p className="text-center text-gray-400 text-xs mt-4">
                <i className="fa-solid fa-lock mr-1"></i> Pago 100% seguro con EasyTicket
              </p>

              <hr className="my-6 border-gray-100" />

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center text-[#0B4D6C] shrink-0">
                    <i className="fa-solid fa-share-nodes"></i>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-700">Comparte el evento</p>
                    <p className="text-xs text-gray-500">Invita a tus amigos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
};

export default EventDetailPage;