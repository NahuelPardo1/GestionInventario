export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    usuario: string;
    rol: number;

}