import { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { capturePayment } from '@/features/payments/api/PaymentsService';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); 
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  
  const hasCaptured = useRef(false);

  useEffect(() => {
    const confirmPayment = async () => {
      if (!token || hasCaptured.current) {
        if (!token) setStatus('error');
        return;
      }

      hasCaptured.current = true;

      try {
        await capturePayment(token, 'PAYPAL');
        setStatus('success');
      } catch (error) {
        console.error("Error capturando pago:", error);
        setStatus('error');
      }
    };
    
    confirmPayment();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
        {status === 'loading' && (
          <>
            <i className="fa-solid fa-circle-notch fa-spin text-4xl text-[#0B4D6C] mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-800">Confirmando pago...</h2>
            <p className="text-gray-500 mt-2">Por favor, no cierres esta ventana.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-check text-4xl text-green-600"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">¡Pago Exitoso!</h2>
            <p className="text-gray-500 mb-8">Tus entradas han sido generadas y confirmadas.</p>
            <Link to="/bookings" className="block w-full bg-[#0B4D6C] text-white font-bold py-3 rounded-xl hover:bg-[#093d56] transition">
              Ver mis Tickets
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-xmark text-4xl text-red-600"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Hubo un problema</h2>
            <p className="text-gray-500 mb-8">No pudimos confirmar tu pago o ya fue procesado.</p>
            <Link to="/" className="block w-full bg-gray-200 text-gray-800 font-bold py-3 rounded-xl hover:bg-gray-300 transition">
              Volver al inicio
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;