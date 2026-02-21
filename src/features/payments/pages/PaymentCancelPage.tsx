import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { cancelPaymentApi } from '@/features/payments/api/PaymentsService';

const PaymentCancelPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    // Si la URL trae un token de PayPal, le avisamos al backend que se canceló
    if (token) {
      cancelPaymentApi(token).catch(err => console.error("Error cancelando:", err));
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-yellow-100">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fa-solid fa-triangle-exclamation text-4xl text-yellow-600"></i>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Pago Cancelado</h2>
        <p className="text-gray-500 mb-8">Has cancelado el proceso de pago. Tu reserva ha sido marcada como cancelada.</p>
        <Link to="/" className="block w-full bg-[#0B4D6C] text-white font-bold py-3 rounded-xl hover:bg-[#093d56] transition">
          Volver a la cartelera
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancelPage;