import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/AuthService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden animate-fade-in">
      <!-- Background decorators -->
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <!-- Login panel -->
      <div class="glass-panel rounded-2xl w-full max-w-md p-8 relative z-10">
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-400 mb-6 border border-indigo-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-white mb-2">Book CRM</h1>
          <p class="text-slate-400">Ingresa a tu cuenta para continuar</p>
        </div>

        <!-- Mensaje de error -->
        <div *ngIf="errorMessage" class="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center animate-fade-in">
          {{ errorMessage }}
        </div>

        <form class="space-y-6" (submit)="onLogin($event)">
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-300 ml-1">Correo electrónico</label>
            <input type="email" name="email" [(ngModel)]="email" class="input-premium" placeholder="admin&#64;bookcrm.com" required>
          </div>
          
          <div class="space-y-2 flex flex-col">
            <label class="text-sm font-medium text-slate-300 ml-1">Contraseña</label>
            <input type="password" name="password" [(ngModel)]="password" class="input-premium" placeholder="••••••••" required>
          </div>

          <button type="submit" class="btn-primary w-full mt-4" [disabled]="loading">
            {{ loading ? 'Ingresando...' : 'Ingresar al sistema' }}
          </button>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  onLogin(event: Event) {
    event.preventDefault();
    this.errorMessage = '';
    this.loading = true;

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/inventario']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || err.error?.Message || 'Credenciales incorrectas. Intenta de nuevo.';
      }
    });
  }
}
