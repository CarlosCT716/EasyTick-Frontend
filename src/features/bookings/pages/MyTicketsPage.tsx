import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react'; 
import { getMyBookings } from '@/features/bookings/api/BookingsService';
import { getEventById } from '@/features/events/api/EventsService';
import { useAuth } from '@/features/auth/hooks/useAuth';
import type { BookingListResponse } from '@/features/bookings/models/BookingListResponse';
import type { EventResponse } from '@/features/events/models/Event';

const MyTicketsPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingListResponse[]>([]);
  // Usamos un diccionario para guardar los datos de los eventos asociados a las reservas
  const [eventsData, setEventsData] = useState<Record<number, EventResponse>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicketsAndEvents = async () => {
      if (!user) return;
      try {
        // 1. Traemos las reservas del usuario
        const myBookings: BookingListResponse[] = await getMyBookings(user.id);
        // Ordenamos para que las más recientes salgan primero
        myBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setBookings(myBookings);

        // 2. Extraemos los IDs de los eventos únicos de esas reservas
        const uniqueEventIds = [...new Set(myBookings.map(b => b.eventId))];

        // 3. Consultamos la info de esos eventos para poder pintar la foto y título
        const eventsPromises = uniqueEventIds.map(id => getEventById(id));
        const eventsResults = await Promise.all(eventsPromises);
        
        // 4. Armamos nuestro diccionario { eventId: EventData }
        const eventMap: Record<number, EventResponse> = {};
        eventsResults.forEach(ev => {
          eventMap[ev.id] = ev;
        });
        setEventsData(eventMap);

      } catch (error) {
        console.error("Error cargando tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketsAndEvents();
  }, [user]);

  if (loading) return <div className="text-center py-20 text-gray-500"><i className="fa-solid fa-circle-notch fa-spin text-4xl mb-4"></i><br/>Cargando tus entradas...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-[#002940]">
          <i className="fa-solid fa-ticket text-[#0B4D6C] mr-3"></i>Mis Tickets
        </h1>
        <Link to="/" className="text-sm font-semibold text-gray-500 hover:text-[#0B4D6C] transition">
          Ver más eventos
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-ticket-simple text-4xl text-gray-300"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-700">Aún no tienes tickets</h3>
          <p className="text-gray-500 mt-2">Explora nuestra cartelera y encuentra tu próximo evento.</p>
          <Link to="/" className="mt-6 inline-block bg-[#0B4D6C] text-white px-6 py-2 rounded-lg font-semibold hover:bg-cyan-700 transition">
            Explorar Eventos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => {
            const event = eventsData[booking.eventId];
            if (!event) return null; // Previene errores si el evento fue eliminado

            const isConfirmed = booking.bookingStatus === 'CONFIRMED';
            const isCancelled = booking.bookingStatus === 'CANCELLED';

            // 🚀 ESTE ES EL DATO QUE LEERÁ EL ESCÁNER QR
            const qrData = JSON.stringify({
              reserva: booking.id,
              evento: event.id,
              usuario: user?.id,
              estado: booking.bookingStatus
            });

            return (
              <div key={booking.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col sm:flex-row relative">
                
                {/* Indicador de estado lateral */}
                <div className={`w-2 sm:w-3 shrink-0 ${isConfirmed ? 'bg-green-500' : isCancelled ? 'bg-red-500' : 'bg-yellow-500'}`}></div>

                {/* Info del Evento */}
                <div className="p-5 flex-1 border-b sm:border-b-0 sm:border-r border-dashed border-gray-300 relative">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ticket #{booking.id}</span>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      isConfirmed ? 'bg-green-100 text-green-700' : 
                      isCancelled ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.bookingStatus}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 leading-tight mb-2 line-clamp-2">{event.title}</h3>
                  
                  <div className="space-y-1 text-sm text-gray-600 mb-4">
                    <p><i className="fa-regular fa-calendar w-4 text-[#0B4D6C]"></i> {new Date(event.eventDate).toLocaleDateString()}</p>
                    <p className="truncate"><i className="fa-solid fa-location-dot w-4 text-[#0B4D6C]"></i> {event.location}</p>
                  </div>

                  <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-50">
                    <div>
                      <p className="text-xs text-gray-400 uppercase">Cantidad</p>
                      <p className="font-black text-gray-800">{booking.quantity} {booking.quantity > 1 ? 'Entradas' : 'Entrada'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 uppercase">Total</p>
                      <p className="font-bold text-[#0B4D6C]">S/ {booking.totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Zona del QR */}
                <div className="p-5 bg-gray-50 flex flex-col items-center justify-center min-w-[160px] relative">
                  {/* Círculos decorativos del ticket (arriba y abajo) */}
                  <div className="hidden sm:block absolute -top-3 -left-3 w-6 h-6 bg-gray-50 rounded-full border-b border-r border-gray-300 rotate-45"></div>
                  <div className="hidden sm:block absolute -bottom-3 -left-3 w-6 h-6 bg-gray-50 rounded-full border-t border-r border-gray-300 -rotate-45"></div>

                  {isConfirmed ? (
                    <>
                      <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 mb-2">
                        {/* 🚀 EL COMPONENTE QR */}
                        <QRCodeSVG value={qrData} size={100} level="M" />
                      </div>
                      <p className="text-[10px] text-gray-400 text-center mt-1">Escanea para ingresar</p>
                    </>
                  ) : (
                    <div className="text-center">
                      <i className={`fa-solid text-4xl mb-2 ${isCancelled ? 'fa-ban text-red-300' : 'fa-clock text-yellow-300'}`}></i>
                      <p className="text-xs font-bold text-gray-500">
                        {isCancelled ? 'ENTRADA ANULADA' : 'PAGO PENDIENTE'}
                      </p>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyTicketsPage;