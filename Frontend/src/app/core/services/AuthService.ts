import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, LoginRequest } from '../models/auth.interfaces';
import { tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private readonly API_URL = '/api/Auth'; // El proxy se encarga del resto
    // Signal para manejar el estado del usuario en toda la app
    currentUser = signal<AuthResponse | null>(null);
    login(credentials: LoginRequest) {
        return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials)
            .pipe(
                tap(response => {
                    // Guardamos el usuario y el token
                    this.currentUser.set(response);
                    localStorage.setItem('token', response.token);
                })
            );
    }
    logout() {
        this.currentUser.set(null);
        localStorage.removeItem('token');
    }
}