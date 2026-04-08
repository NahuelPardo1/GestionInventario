import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-reportes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col gap-6 animate-fade-in">
      
      <!-- Header -->
      <div class="p-2 border-b border-white/5 pb-4">
        <h2 class="text-2xl font-bold text-white tracking-tight">Reportes Financieros</h2>
        <p class="text-slate-400 text-sm mt-1">Resumen mensual y análisis de rentabilidad.</p>
      </div>

      <!-- Stats Cards Row -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Stat -> Ingresos -->
        <div class="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-500/30 transition-all duration-500"></div>
          <div class="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p class="text-sm font-medium text-slate-400">Ingresos del Mes</p>
              <h3 class="text-3xl font-bold text-white mt-1">\$\xA012,450</h3>
            </div>
            <div class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <p class="text-xs text-slate-400 relative z-10"><span class="text-emerald-400 font-medium">+12.5%</span> respecto al mes anterior</p>
        </div>

        <!-- Stat -> Libros Vendidos -->
        <div class="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl group-hover:bg-indigo-500/30 transition-all duration-500"></div>
          <div class="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p class="text-sm font-medium text-slate-400">Libros Vendidos</p>
              <h3 class="text-3xl font-bold text-white mt-1">342</h3>
            </div>
            <div class="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <p class="text-xs text-slate-400 relative z-10"><span class="text-indigo-400 font-medium">+4.1%</span> respecto al mes anterior</p>
        </div>

        <!-- Stat -> Valor del Inventario -->
        <div class="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-500/20 rounded-full blur-xl group-hover:bg-purple-500/30 transition-all duration-500"></div>
          <div class="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p class="text-sm font-medium text-slate-400">Valor Stock Actual</p>
              <h3 class="text-3xl font-bold text-white mt-1">\$\xA084,200</h3>
            </div>
            <div class="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <p class="text-xs text-slate-400 relative z-10">Calculado a precio de venta final</p>
        </div>
      </div>

      <!-- Main Chart Area (Placeholder visualization) -->
      <div class="glass-panel rounded-2xl flex-1 border border-white/5 p-6 flex flex-col">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-lg font-bold text-white">Evolución de Ingresos</h3>
          <select class="input-premium py-1 px-2 text-sm w-auto bg-slate-800/50">
            <option>Últimos 6 meses</option>
            <option>Este año</option>
          </select>
        </div>

        <div class="flex-1 flex items-end justify-between gap-2 md:gap-6 pt-10">
          <!-- Fake bars -->
          <div *ngFor="let h of [40, 60, 30, 80, 50, 90]" class="w-full flex flex-col items-center gap-3">
            <div class="w-full bg-indigo-500/20 rounded-t-lg relative group transition-all" [style.height.%]="h">
              <!-- Bar -->
              <div class="absolute inset-x-0 bottom-0 bg-indigo-500 rounded-t-lg transition-all duration-500 group-hover:bg-indigo-400"
                   [style.height.%]="80"></div>
            </div>
            <span class="text-xs text-slate-500">Mes</span>
          </div>
        </div>
      </div>

    </div>
  `
})
export class DashboardReportesComponent {}
