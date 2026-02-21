// src/features/events/api/eventsApi.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/events';

const eventsApi = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para agregar el token automáticamente
eventsApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // 🔑 token guardado al login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default eventsApi;