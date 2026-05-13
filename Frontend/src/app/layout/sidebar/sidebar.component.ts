import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/AuthService';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="w-64 h-full glass-nav flex flex-col p-4 z-20 sticky top-0">
      <!-- Logo -->
      <div class="flex items-center gap-3 px-2 mb-8 mt-2">
        <div class="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 text-indigo-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div>
          <h2 class="text-white font-bold tracking-wide">Book CRM</h2>
          <p class="text-xs text-slate-400">Panel de Control</p>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 space-y-1 overflow-y-auto">
        <!-- Catálogo -->
        <p class="px-4 pt-2 pb-1 text-[10px] uppercase font-semibold text-slate-600 tracking-widest">Catálogo</p>
        <a routerLink="/dashboard/inventario" routerLinkActive="bg-white/10 text-white border-white/20" [routerLinkActiveOptions]="{exact: false}"
           class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 border border-transparent transition-all group">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
          <span class="font-medium text-sm">Inventario</span>
        </a>
        <a routerLink="/dashboard/autores" routerLinkActive="bg-white/10 text-white border-white/20"
           class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 border border-transparent transition-all group">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          <span class="font-medium text-sm">Autores</span>
        </a>
        <a routerLink="/dashboard/categorias" routerLinkActive="bg-white/10 text-white border-white/20"
           class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 border border-transparent transition-all group">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a2 2 0 012-2z"/></svg>
          <span class="font-medium text-sm">Categorías</span>
        </a>

        <!-- Operaciones -->
        <p class="px-4 pt-3 pb-1 text-[10px] uppercase font-semibold text-slate-600 tracking-widest">Operaciones</p>
        <a routerLink="/dashboard/clientes" routerLinkActive="bg-white/10 text-white border-white/20"
           class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 border border-transparent transition-all group">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <span class="font-medium text-sm">Clientes</span>
        </a>
        <a routerLink="/dashboard/ventas" routerLinkActive="bg-white/10 text-white border-white/20"
           class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 border border-transparent transition-all group">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:text-amber-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
          <span class="font-medium text-sm">Ventas</span>
        </a>
        <a routerLink="/dashboard/prestamos" routerLinkActive="bg-white/10 text-white border-white/20"
           class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 border border-transparent transition-all group">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:text-violet-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
          <span class="font-medium text-sm">Préstamos</span>
        </a>
        <a routerLink="/dashboard/stocks" routerLinkActive="bg-white/10 text-white border-white/20"
           class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 border border-transparent transition-all group">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:text-rose-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          <span class="font-medium text-sm">Stock</span>
        </a>

        <!-- Análisis -->
        <p class="px-4 pt-3 pb-1 text-[10px] uppercase font-semibold text-slate-600 tracking-widest">Análisis</p>
        <a routerLink="/dashboard/reportes" routerLinkActive="bg-white/10 text-white border-white/20"
           class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 border border-transparent transition-all group">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:text-amber-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          <span class="font-medium text-sm">Reportes Financieros</span>
        </a>
      </nav>

      <!-- User/Bottom Section -->
      <div class="mt-auto">
        <div class="h-px w-full bg-white/10 my-4"></div>
        <!-- Current User -->
        <div *ngIf="authService.currentUser()" class="flex items-center gap-3 px-4 py-2 mb-2">
          <div class="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm font-bold border border-indigo-500/30">
            {{ authService.currentUser()!.usuario.charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-white truncate">{{ authService.currentUser()!.usuario }}</p>
            <p class="text-[10px] text-slate-500">{{ authService.currentUser()!.rol === 1 ? 'Administrador' : 'Vendedor' }}</p>
          </div>
        </div>
        <button (click)="authService.logout()" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer border-none bg-transparent">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span class="font-medium text-sm">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  authService = inject(AuthService);
}
