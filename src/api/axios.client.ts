import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../shared/utils/constants';

const client: AxiosInstance = axios.create({
    baseURL : API_BASE_URL,
    headers: {
      'Content-Type' : 'application/json'
    },
});
//interceptor de token
client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
      
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error("Sesión expirada o token inválido");
        }
        return Promise.reject(error);
    }
);

export default client;