import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { API_BASE_URL } from '../shared/utils/constants';

const client: AxiosInstance = axios.create({
    baseURL : API_BASE_URL,
    headers: {
      'Content-Type' : 'application/json'
    },
});

export default client;