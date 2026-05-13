import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, LoginRequest } from '../models/auth.interfaces';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly API_URL = '/api/Auth';

  currentUser = signal<AuthResponse | null>(this.loadFromStorage());

  login(credentials: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap(response => {
          this.currentUser.set(response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response));
        })
      );
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private loadFromStorage(): AuthResponse | null {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }
}