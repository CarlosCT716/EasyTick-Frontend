export const UserRole = {
  CUSTOMER: 'CUSTOMER',
  ORGANIZER: 'ORGANIZER',
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
} as const;

export type UserRoleType = typeof UserRole[keyof typeof UserRole];

// Tipo para el registro de usuario (request)
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  roleType: UserRoleType;
}

// Tipo para el login (request)
export interface LoginRequest {
  email: string;
  password: string;
}

// Tipo para el usuario (response)
export interface User {
  id: number;
  name: string;
  email: string;
  roleType: UserRoleType;
  enabled: boolean;
  createdAt: string;
}

// Tipo para la respuesta del login
export interface AuthResponse {
  token: string;
  type: string;
  user: User;
}