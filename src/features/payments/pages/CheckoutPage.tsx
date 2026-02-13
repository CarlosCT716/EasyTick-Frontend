import { useState } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const orderDetails = {
    eventTitle: "Tech Summit Lima 2026",
    ticketType: "Entrada General",
    quantity: 2,
    pricePerUnit: 150.00,
    subtotal: 300.00,
    serviceFee: 15.00, 
    total: 315.00,
    image: "https://picsum.photos/seed/tech/200/200"
  };

  const createOrder = (_data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          description: `Tickets para ${orderDetails.eventTitle}`,
          amount: {
            currency_code: "USD", 
            value: orderDetails.total.toString(), 
          },
        },
      ],
    });
  };

  const onApprove = async (_data: any, actions: any) => {
    try {
        const order = await actions.order.capture();
        console.log("Pago exitoso:", order);

        setPaid(true);
    } catch (err) {
        console.error("Error al capturar el pago:", err);
        setError("Hubo un error al procesar tu pago. Por favor intenta nuevamente.");
    }
  };

  if (paid) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-green-100">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fa-solid fa-check text-4xl text-green-600"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">¡Pago Exitoso!</h2>
                <p className="text-gray-500 mb-8">Tus entradas han sido enviadas a tu correo electrónico.</p>
                <Link to="/bookings" className="block w-full bg-[#0B4D6C] text-white font-bold py-3 rounded-xl hover:bg-[#093d56] transition">
                    Ver mis Tickets
                </Link>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        
        <div className="mb-8">
            <Link to="/" className="text-gray-500 hover:text-[#0B4D6C] flex items-center gap-2 mb-4 text-sm font-semibold transition">
                <i className="fa-solid fa-arrow-left"></i> Cancelar y volver
            </Link>
            <h1 className="text-3xl font-bold text-[#002940]">Finalizar Compra</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-6">
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6">
                    <img src={orderDetails.image} alt="Evento" className="w-full sm:w-32 h-32 object-cover rounded-xl" />
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{orderDetails.eventTitle}</h3>
                        <div className="text-gray-500 text-sm space-y-1">
                            <p><i className="fa-regular fa-calendar mr-2"></i> 15 Feb, 2026 • 09:00 AM</p>
                            <p><i className="fa-solid fa-location-dot mr-2"></i> Centro de Convenciones</p>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                            <span className="bg-cyan-50 text-[#0B4D6C] text-xs font-bold px-3 py-1 rounded-full uppercase">
                                {orderDetails.ticketType}
                            </span>
                            <span className="text-gray-400 text-sm">x {orderDetails.quantity}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-gray-800">S/ {orderDetails.subtotal.toFixed(2)}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg text-gray-800 mb-4 border-b border-gray-100 pb-2">Información de Contacto</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-500 mb-1">Nombre Completo</p>
                            <p className="font-semibold text-gray-800">Carlos Correa</p>
                        </div>
                        <div>
                            <p className="text-gray-500 mb-1">Correo Electrónico</p>
                            <p className="font-semibold text-gray-800">carlos@easyticket.com</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                    <h3 className="font-bold text-lg text-gray-800 mb-6">Resumen de Pago</h3>
                    
                    <div className="space-y-3 mb-6 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal ({orderDetails.quantity} tickets)</span>
                            <span>S/ {orderDetails.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Comisión de servicio</span>
                            <span>S/ {orderDetails.serviceFee.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-gray-100 my-2 pt-2 flex justify-between text-lg font-bold text-[#0B4D6C]">
                            <span>Total a pagar</span>
                            <span>S/ {orderDetails.total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="mt-6 relative z-0">
                        {error && (
                            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 flex items-center gap-2">
                                <i className="fa-solid fa-circle-exclamation"></i>
                                {error}
                            </div>
                        )}
                        
                        <PayPalButtons 
                            style={{ 
                                layout: "vertical",
                                color: "blue", 
                                shape: "rect",
                                label: "pay"
                            }}
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={(err) => {
                                console.error("PayPal Error:", err);
                                setError("Ocurrió un error con PayPal.");
                            }}
                        />
                    </div>

                    <p className="text-xs text-center text-gray-400 mt-4">
                        <i className="fa-solid fa-lock mr-1"></i> 
                        Tus datos están protegidos. La transacción se realiza en servidores seguros de PayPal.
                    </p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;