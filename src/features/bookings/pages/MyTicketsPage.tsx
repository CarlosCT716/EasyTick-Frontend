import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react'; 
import { Client } from '@stomp/stompjs'; 
import SockJS from 'sockjs-client';      
import { getMyBookings } from '@/features/bookings/api/BookingsService';
import { getEventById } from '@/features/events/api/EventsService';
import { useAuth } from '@/features/auth/hooks/useAuth';
import type { BookingListResponse } from '@/features/bookings/models/BookingListResponse';
import type { EventResponse } from '@/features/events/models/Event';

const MyTicketsPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingListResponse[]>([]);
  const [eventsData, setEventsData] = useState<Record<number, EventResponse>>({});
  const [loading, setLoading] = useState(true);
  
  const stompClientRef = useRef<Client | null>(null);

  const fetchTicketsAndEvents = async (userId: number) => {
    try {
      const myBookings: BookingListResponse[] = await getMyBookings(userId);
      myBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setBookings(myBookings);

      const uniqueEventIds = [...new Set(myBookings.map(b => b.eventId))];

      const eventsPromises = uniqueEventIds.map(id => getEventById(id));
      const eventsResults = await Promise.all(eventsPromises);
      
      const eventMap: Record<number, EventResponse> = {};
      eventsResults.forEach(ev => {
        eventMap[ev.id] = ev;
      });
      setEventsData(eventMap);

    } catch (error) {
      console.error("Error cargando tickets:", error);
    }
  };

  useEffect(() => {
    if (!user) return;
    
    fetchTicketsAndEvents(user.id).finally(() => {
      setLoading(false);
    });
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/api/bookings/ws'),
      debug: (str) => console.log('🔌 STOMP: ' + str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log('✅ Conectado al WebSocket!');
      
      const userTopic = `/topic/user/${user.id}/tickets`;
      console.log(`🎧 Escuchando nuevas compras en: ${userTopic}`);
      
      client.subscribe(userTopic, async (message) => {
        if (message.body) {
          const data = JSON.parse(message.body);
          console.log('¡NUEVA COMPRA O ACTUALIZACIÓN DETECTADA EN TIEMPO REAL!', data);
          
          await fetchTicketsAndEvents(user.id);
        }
      });
    };

    client.activate();
    stompClientRef.current = client;
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
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
            if (!event) return null;

            const isConfirmed = booking.bookingStatus === 'CONFIRMED' || booking.bookingStatus === 'COMPLETED';
            const isCancelled = booking.bookingStatus === 'CANCELLED' || booking.bookingStatus === 'FAILED';

            const qrData = JSON.stringify({
              reserva: booking.id,
              evento: event.id,
              usuario: user?.id,
              estado: booking.bookingStatus
            });

            return (
              <div key={booking.id} className={`bg-white rounded-2xl shadow-md border overflow-hidden flex flex-col sm:flex-row relative transition-all duration-500 ${isConfirmed ? 'border-green-200 shadow-green-100' : 'border-gray-100'}`}>
                
                <div className={`w-2 sm:w-3 shrink-0 transition-colors duration-500 ${isConfirmed ? 'bg-green-500' : isCancelled ? 'bg-red-500' : 'bg-yellow-400 animate-pulse'}`}></div>

                {/* Info del Evento */}
                <div className="p-5 flex-1 border-b sm:border-b-0 sm:border-r border-dashed border-gray-300 relative">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ticket #{booking.id}</span>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-colors duration-500 ${
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
                <div className="p-5 bg-gray-50 flex flex-col items-center justify-center min-w-40 relative transition-all duration-500">
                  <div className="hidden sm:block absolute -top-3 -left-3 w-6 h-6 bg-gray-50 rounded-full border-b border-r border-gray-300 rotate-45"></div>
                  <div className="hidden sm:block absolute -bottom-3 -left-3 w-6 h-6 bg-gray-50 rounded-full border-t border-r border-gray-300 -rotate-45"></div>

                  {isConfirmed ? (
                    <div className="animate-fade-in-up flex flex-col items-center">
                      <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 mb-2">
                        <QRCodeSVG value={qrData} size={100} level="M" />
                      </div>
                      <p className="text-[10px] text-gray-400 text-center mt-1">Escanea para ingresar</p>
                    </div>
                  ) : (
                    <div className="text-center flex flex-col items-center">
                      {isCancelled ? (
                        <i className="fa-solid fa-ban text-4xl mb-2 text-red-300"></i>
                      ) : (
                        <i className="fa-solid fa-circle-notch fa-spin text-4xl mb-2 text-yellow-400"></i>
                      )}
                      <p className="text-xs font-bold text-gray-500 mt-2">
                        {isCancelled ? 'ENTRADA ANULADA' : 'PROCESANDO PAGO...'}
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