export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  usuario: string;
  rol: number; // 1 = Administrador, 2 = Vendedor
}

export interface RegisterRequest {
  nombre: string;
  email: string;
  password: string;
  rol: number;
}