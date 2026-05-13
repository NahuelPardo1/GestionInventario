import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportesService } from '../../../core/services/reportes.service';
import { DashboardDto, AnalisisFinancieroDto } from '../../../core/models/reportes.interfaces';

@Component({
  selector: 'app-dashboard-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="h-full flex flex-col gap-6 animate-fade-in">
      
      <!-- Header -->
      <div class="p-2 border-b border-white/5 pb-4">
        <h2 class="text-2xl font-bold text-white tracking-tight">Reportes Financieros</h2>
        <p class="text-slate-400 text-sm mt-1">Resumen general y análisis de rentabilidad.</p>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="flex-1 flex items-center justify-center">
        <div class="text-slate-400 animate-pulse text-lg">Cargando reportes...</div>
      </div>

      <ng-container *ngIf="!loading">
        <!-- Stats Cards Row -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <!-- Total Libros -->
          <div class="glass-panel p-6 rounded-2xl relative overflow-hidden group">
            <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl group-hover:bg-indigo-500/30 transition-all duration-500"></div>
            <div class="flex justify-between items-start mb-4 relative z-10">
              <div>
                <p class="text-sm font-medium text-slate-400">Total Libros</p>
                <h3 class="text-3xl font-bold text-white mt-1">{{ dashboard?.totalLibros ?? 0 }}</h3>
              </div>
              <div class="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <p class="text-xs text-slate-400 relative z-10">Títulos en el sistema</p>
          </div>

          <!-- Total Clientes -->
          <div class="glass-panel p-6 rounded-2xl relative overflow-hidden group">
            <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl group-hover:bg-cyan-500/30 transition-all duration-500"></div>
            <div class="flex justify-between items-start mb-4 relative z-10">
              <div>
                <p class="text-sm font-medium text-slate-400">Total Clientes</p>
                <h3 class="text-3xl font-bold text-white mt-1">{{ dashboard?.totalClientes ?? 0 }}</h3>
              </div>
              <div class="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <p class="text-xs text-slate-400 relative z-10">Clientes registrados</p>
          </div>

          <!-- Total Ventas -->
          <div class="glass-panel p-6 rounded-2xl relative overflow-hidden group">
            <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/20 rounded-full blur-xl group-hover:bg-amber-500/30 transition-all duration-500"></div>
            <div class="flex justify-between items-start mb-4 relative z-10">
              <div>
                <p class="text-sm font-medium text-slate-400">Total Ventas</p>
                <h3 class="text-3xl font-bold text-white mt-1">{{ dashboard?.totalVentas ?? 0 }}</h3>
              </div>
              <div class="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
              </div>
            </div>
            <p class="text-xs text-slate-400 relative z-10">Operaciones realizadas</p>
          </div>

          <!-- Ganancias Totales -->
          <div class="glass-panel p-6 rounded-2xl relative overflow-hidden group">
            <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-500/30 transition-all duration-500"></div>
            <div class="flex justify-between items-start mb-4 relative z-10">
              <div>
                <p class="text-sm font-medium text-slate-400">Ganancias Totales</p>
                <h3 class="text-3xl font-bold text-white mt-1">\${{ dashboard?.gananciasTotales | number:'1.2-2' }}</h3>
              </div>
              <div class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <p class="text-xs text-slate-400 relative z-10">Ingresos acumulados</p>
          </div>
        </div>

        <!-- Stock Crítico Warning -->
        <div *ngIf="dashboard?.librosStockCritico?.length" class="glass-panel rounded-2xl border border-amber-500/20 p-6">
          <h3 class="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Libros con Stock Crítico
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div *ngFor="let libro of dashboard!.librosStockCritico" class="flex items-center justify-between p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
              <span class="text-sm text-white truncate">{{ libro.titulo }}</span>
              <span class="text-sm font-semibold ml-2 px-2 py-0.5 rounded text-amber-400 bg-amber-500/10">{{ libro.stockActual }} uds</span>
            </div>
          </div>
        </div>

        <!-- Chart Area -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Revenue Chart -->
          <div class="glass-panel rounded-2xl border border-white/5 p-6 flex flex-col">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-bold text-white">Evolución de Ingresos</h3>
              <select [(ngModel)]="selectedMeses" (ngModelChange)="loadFinanciero()" class="input-premium py-1 px-2 text-sm w-auto bg-slate-800/50">
                <option [ngValue]="6">6 meses</option>
                <option [ngValue]="12">12 meses</option>
              </select>
            </div>

            <div *ngIf="financiero" class="flex-1 flex items-end justify-between gap-2 pt-8 min-h-[200px]">
              <div *ngFor="let ganancia of financiero.gananciasData; let i = index" class="w-full flex flex-col items-center gap-2">
                <div class="w-full bg-indigo-500/20 rounded-t-lg relative group transition-all cursor-default" 
                     [style.height.px]="getBarHeight(ganancia)"
                     [title]="'$' + ganancia">
                  <div class="absolute inset-x-0 bottom-0 bg-indigo-500 rounded-t-lg transition-all duration-500 group-hover:bg-indigo-400"
                       style="height: 100%"></div>
                </div>
                <span class="text-[10px] text-slate-500 truncate w-full text-center">{{ financiero.labelsMeses[i] }}</span>
              </div>
            </div>
          </div>

          <!-- Top Sold Books -->
          <div class="glass-panel rounded-2xl border border-white/5 p-6 flex flex-col">
            <h3 class="text-lg font-bold text-white mb-6">Top Libros Vendidos</h3>
            <div *ngIf="financiero" class="flex-1 flex flex-col justify-center gap-4">
              <div *ngFor="let top of financiero.topLibrosVendidos; let i = index" class="flex items-center gap-3">
                <span class="text-xs text-slate-500 w-6 text-right font-bold">{{ i + 1 }}.</span>
                <div class="flex-1">
                  <div class="flex justify-between mb-1">
                    <span class="text-sm text-white truncate">{{ top.titulo }}</span>
                    <span class="text-xs text-slate-400 ml-2">{{ top.cantidadVendida }} uds</span>
                  </div>
                  <div class="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div class="h-full bg-indigo-500 rounded-full transition-all duration-700"
                         [style.width.%]="getTopBarWidth(top.cantidadVendida)"></div>
                  </div>
                </div>
              </div>
              <div *ngIf="!financiero.topLibrosVendidos.length" class="text-center text-slate-500 text-sm py-4">
                Aún no hay datos de ventas.
              </div>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `
})
export class DashboardReportesComponent implements OnInit {
  private reportesService = inject(ReportesService);

  dashboard: DashboardDto | null = null;
  financiero: AnalisisFinancieroDto | null = null;
  loading = true;
  selectedMeses = 12;

  private maxGanancia = 1;
  private maxTopVendido = 1;

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.reportesService.getDashboard().subscribe({
      next: (data) => {
        this.dashboard = data;
        this.loadFinanciero();
      },
      error: () => this.loading = false
    });
  }

  loadFinanciero() {
    this.reportesService.getFinanciero(this.selectedMeses).subscribe({
      next: (data) => {
        this.financiero = data;
        this.maxGanancia = Math.max(...data.gananciasData, 1);
        this.maxTopVendido = Math.max(...data.topLibrosVendidos.map(t => t.cantidadVendida), 1);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  getBarHeight(value: number): number {
    return Math.max((value / this.maxGanancia) * 160, 4);
  }

  getTopBarWidth(value: number): number {
    return (value / this.maxTopVendido) * 100;
  }
}
