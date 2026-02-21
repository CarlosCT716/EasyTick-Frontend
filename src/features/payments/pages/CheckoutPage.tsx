import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventById } from '@/features/events/api/EventsService';
import { createBooking } from '@/features/bookings/api/BookingsService';
import { getPaymentsByBooking, initiatePayment } from '@/features/payments/api/PaymentsService';
import { useAuth } from '@/features/auth/hooks/useAuth';
import type { EventResponse } from '@/features/events/models/Event';
import type { PaymentRecord, PaypalResponse, PaypalLink } from '@/features/payments/dto/PaymentTypes';

const CheckoutPage = () => {
  const { id } = useParams<{ id: string }>(); 
  
  const { user } = useAuth();
  
  const [event, setEvent] = useState<EventResponse | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (id) {
          const data = await getEventById(id);
          setEvent(data);
        }
      } catch (err) {
        console.error(err);
        setError('Error al cargar el evento.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const waitForPaymentRecord = async (bookingId: number, retries = 5): Promise<PaymentRecord> => {
    if (retries === 0) throw new Error("Tiempo de espera agotado al generar el pago. Intenta de nuevo.");
    
    const payments: PaymentRecord[] = await getPaymentsByBooking(bookingId);
    
    if (payments && payments.length > 0) {
      return payments[0]; 
    }
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    return waitForPaymentRecord(bookingId, retries - 1);
  };

  const handlePagar = async () => {
    if (!event || !user) {
        setError("Debes iniciar sesión para comprar entradas.");
        return;
    }

    setProcessing(true);
    setError(null);

    try {
      const booking = await createBooking({ 
          eventId: event.id, 
          quantity: quantity,
          userId: user.id 
      });
      
      const paymentRecord = await waitForPaymentRecord(booking.id);
      
      const paypalResponse: PaypalResponse = await initiatePayment(paymentRecord.id, 'PAYPAL');
      
      const approveLink = paypalResponse.links.find((link: PaypalLink) => link.rel === 'approve');
      
      if (approveLink) {
        window.location.href = approveLink.href; 
      } else {
        throw new Error("No se pudo obtener el link seguro de PayPal");
      }

    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado al procesar la reserva.");
      }
      setProcessing(false);
    }
  };

  if (loading) return <div className="text-center py-20">Cargando detalles de compra...</div>;
  if (!event) return <div className="text-center py-20 text-red-500">Evento no encontrado.</div>;

  const subtotal = event.price * quantity;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to={`/event/${event.id}`} className="text-gray-500 hover:text-[#0B4D6C] flex items-center gap-2 mb-6 text-sm font-semibold">
          <i className="fa-solid fa-arrow-left"></i> Volver al evento
        </Link>
        <h1 className="text-3xl font-bold text-[#002940] mb-8">Finalizar Compra</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Detalles del Evento */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover rounded-xl mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
              <p className="text-gray-500 text-sm mb-4">
                <i className="fa-regular fa-calendar mr-2"></i> {new Date(event.eventDate).toLocaleDateString()} <br/>
                <i className="fa-solid fa-location-dot mr-2 mt-2"></i> {event.location}
              </p>
              
              <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-4">
                <span className="font-semibold text-gray-700">Cantidad de tickets:</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">-</button>
                  <span className="font-bold w-4 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(event.availableSlots, quantity + 1))} className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">+</button>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen de Pago */}
          <div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
              <h3 className="font-bold text-lg text-gray-800 mb-6">Resumen de Pago</h3>
              <div className="space-y-3 mb-6 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Precio unitario</span>
                  <span>S/ {event.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal ({quantity} tickets)</span>
                  <span>S/ {subtotal.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 my-2 pt-2 flex justify-between text-xl font-black text-[#0B4D6C]">
                  <span>Total a pagar</span>
                  <span>S/ {subtotal.toFixed(2)}</span>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
                  <i className="fa-solid fa-circle-exclamation mr-2"></i> {error}
                </div>
              )}

              <button 
                onClick={handlePagar}
                disabled={processing || subtotal === 0}
                className="w-full bg-[#003087] hover:bg-[#001c53] text-white font-bold py-4 rounded-xl shadow-lg transition flex justify-center items-center gap-3 disabled:opacity-50"
              >
                {processing ? (
                  <><i className="fa-solid fa-spinner fa-spin"></i> Procesando reserva...</>
                ) : (
                  <><i className="fa-brands fa-paypal text-xl"></i> Pagar con PayPal</>
                )}
              </button>
              <p className="text-xs text-center text-gray-400 mt-4">
                <i className="fa-solid fa-lock mr-1"></i> Redirección segura a PayPal
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;