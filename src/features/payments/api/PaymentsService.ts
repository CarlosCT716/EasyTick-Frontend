import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080/api/payments' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getPaymentsByBooking = async (bookingId: number) => {
  const response = await api.get(`/booking/${bookingId}`);
  return response.data; 
};

export const initiatePayment = async (paymentId: number, method: string) => {
  const response = await api.post(`/${paymentId}/initiate`, null, { params: { method } });
  return response.data; 
};

export const capturePayment = async (token: string, method: string) => {
  const response = await api.post(`/capture`, null, { params: { token, method } });
  return response.data;
};
export const cancelPaymentApi = async (token: string) => {
  const response = await api.post(`/cancel`, null, { params: { token } });
  return response.data;
};