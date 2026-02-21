import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080/api/bookings' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const createBooking = async (data: { eventId: number; quantity: number; userId: number }) => {
  const response = await api.post('/registrar', data);
  return response.data;
};

export const getMyBookings = async (userId: number) => {
  const response = await api.get(`/user/${userId}`);
  return response.data;
};