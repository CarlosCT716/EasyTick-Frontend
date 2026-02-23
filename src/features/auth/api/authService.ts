import authApi from '@/features/auth/api/authApi';
import type { RegisterRequest, LoginRequest, User, AuthResponse } from '@/features/auth/models/authTypes';

// Servicio de autenticación
export const authService = {
  // Registrar un nuevo usuario
  register: async (data: RegisterRequest): Promise<User> => {
    const response = await authApi.post<User>('/register', data);
    return response.data;
  },

  // Login de usuario
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await authApi.post<AuthResponse>('/login', data);
    
    // Guardar el token en localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  // Logout (eliminar token)
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Obtener usuario actual del localStorage
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Verificar si hay un usuario autenticado
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  // Obtener el token
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },
  
  // Obtener un usuario específico por su ID (Ej: para mostrar el organizador del evento)
  getUserById: async (id: number): Promise<User> => {
    const response = await authApi.get<User>(`/user/id/${id}`);
    return response.data;
  },
};