import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentaService } from '../../core/services/venta.service';
import { LibroService } from '../../core/services/libro.service';
import { ClienteService } from '../../core/services/cliente.service';
import { ReportesService } from '../../core/services/reportes.service';
import { VentaDto, VentaCreateDto, ClienteDto } from '../../core/models/venta.interfaces';
import { LibroDto } from '../../core/models/libro.interfaces';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="h-full flex flex-col gap-6 animate-fade-in">
      <div class="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/5 relative overflow-hidden">
        <div class="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div>
          <h2 class="text-2xl font-bold text-white tracking-tight">Ventas</h2>
          <p class="text-slate-400 text-sm mt-1">Registra y gestiona las ventas de libros.</p>
        </div>
        <button (click)="openAdd()" class="btn-primary flex items-center gap-2 whitespace-nowrap relative z-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          Nueva Venta
        </button>
      </div>

      <div *ngIf="notification" class="p-3 rounded-lg text-sm text-center animate-fade-in"
           [ngClass]="notification.type==='success'?'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400':'bg-rose-500/10 border border-rose-500/20 text-rose-400'">
        {{ notification.message }}
      </div>

      <div *ngIf="loading" class="flex-1 flex items-center justify-center">
        <div class="text-slate-400 animate-pulse">Cargando ventas...</div>
      </div>

      <div *ngIf="!loading" class="glass-panel rounded-2xl border border-white/5 overflow-hidden flex-1">
        <table class="w-full text-left text-sm text-slate-300">
          <thead class="text-xs uppercase bg-white/5 border-b border-white/10 text-slate-400">
            <tr>
              <th class="px-6 py-4">Libro</th>
              <th class="px-6 py-4">Cliente</th>
              <th class="px-6 py-4">Fecha</th>
              <th class="px-6 py-4 text-center">Cantidad</th>
              <th class="px-6 py-4 text-right">Total</th>
              <th class="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr *ngIf="ventas.length===0"><td colspan="6" class="px-6 py-10 text-center text-slate-500">No hay ventas registradas.</td></tr>
            <tr *ngFor="let v of ventas" class="hover:bg-white/5 transition-colors group">
              <td class="px-6 py-4 font-medium text-white">{{ getLibroTitulo(v.libroId) }}</td>
              <td class="px-6 py-4">{{ getClienteNombre(v.clienteId) }}</td>
              <td class="px-6 py-4 text-slate-400">{{ v.fechaVenta | date:'dd/MM/yyyy' }}</td>
              <td class="px-6 py-4 text-center">
                <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/10 text-amber-400">{{ v.cantidad }}</span>
              </td>
              <td class="px-6 py-4 text-right font-medium text-emerald-400">\${{ v.total | number:'1.2-2' }}</td>
              <td class="px-6 py-4 text-center">
                <div class="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button class="btn-icon danger" (click)="deleteVenta(v)" title="Eliminar (repone stock)"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div *ngIf="totalPages > 1" class="flex items-center justify-between px-6 py-4 border-t border-white/5">
          <span class="text-sm text-slate-400">Página {{ page }} de {{ totalPages }}</span>
          <div class="flex gap-2">
            <button (click)="changePage(page-1)" [disabled]="page<=1" class="btn-secondary text-sm px-3 py-1.5">← Anterior</button>
            <button (click)="changePage(page+1)" [disabled]="page>=totalPages" class="btn-secondary text-sm px-3 py-1.5">Siguiente →</button>
          </div>
        </div>
      </div>
    </div>

    <div *ngIf="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div class="glass-panel border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl animate-fade-in">
        <div class="px-6 py-5 border-b border-white/5 flex items-center justify-between">
          <h2 class="text-xl font-bold text-white">Registrar Venta</h2>
          <button (click)="showModal=false" class="btn-icon"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
        </div>
        <div *ngIf="errorMsg" class="mx-6 mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">{{ errorMsg }}</div>
        <form (ngSubmit)="save()" class="p-6 space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-300 ml-1">Libro *</label>
            <select [(ngModel)]="form.libroId" name="libroId" class="input-premium appearance-none bg-slate-800/50" required>
              <option [ngValue]="0" disabled>Seleccionar libro...</option>
              <option *ngFor="let l of libros" [ngValue]="l.id">{{ l.titulo }}</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-300 ml-1">Cliente *</label>
            <select [(ngModel)]="form.clienteId" name="clienteId" class="input-premium appearance-none bg-slate-800/50" required>
              <option [ngValue]="0" disabled>Seleccionar cliente...</option>
              <option *ngFor="let c of clientes" [ngValue]="c.id">{{ c.nombre }}</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300 ml-1">Cantidad *</label>
              <input type="number" [(ngModel)]="form.cantidad" name="cantidad" class="input-premium" required min="1" (ngModelChange)="calcTotal()">
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300 ml-1">Total ($) *</label>
              <input type="number" [(ngModel)]="form.total" name="total" class="input-premium" required min="0" step="0.01">
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-300 ml-1">Fecha de Venta *</label>
            <input type="date" [(ngModel)]="form.fechaVenta" name="fechaVenta" class="input-premium" required>
          </div>
          <div class="pt-4 flex justify-end gap-3 border-t border-white/5">
            <button type="button" (click)="showModal=false" class="btn-secondary">Cancelar</button>
            <button type="submit" class="btn-primary" [disabled]="saving">{{ saving ? 'Registrando...' : 'Registrar Venta' }}</button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class VentasComponent implements OnInit {
  private ventaService = inject(VentaService);
  private libroService = inject(LibroService);
  private clienteService = inject(ClienteService);
  private reportesService = inject(ReportesService);

  ventas: VentaDto[] = [];
  libros: LibroDto[] = [];
  clientes: ClienteDto[] = [];
  loading = true; showModal = false; saving = false;
  page = 1; totalPages = 0; errorMsg = '';
  notification: { message: string; type: 'success' | 'error' } | null = null;
  form: VentaCreateDto = { libroId: 0, clienteId: 0, fechaVenta: new Date().toISOString().split('T')[0], cantidad: 1, total: 0 };

  ngOnInit() {
    this.load();
    this.libroService.getAll(1, 100).subscribe(r => this.libros = r.items);
    this.clienteService.getAll(1, 100).subscribe(r => this.clientes = r.items);
  }

  load() { this.loading = true; this.ventaService.getAll(this.page).subscribe({ next: r => { this.ventas = r.items; this.totalPages = r.totalPages; this.loading = false; }, error: () => this.loading = false }); }
  changePage(p: number) { this.page = p; this.load(); }

  openAdd() {
    this.form = { libroId: 0, clienteId: 0, fechaVenta: new Date().toISOString().split('T')[0], cantidad: 1, total: 0 };
    this.errorMsg = ''; this.showModal = true;
  }

  calcTotal() {
    const libro = this.libros.find(l => l.id === this.form.libroId);
    if (libro) this.form.total = libro.precio * this.form.cantidad;
  }

  save() {
    this.saving = true; this.errorMsg = '';
    this.ventaService.create(this.form).subscribe({
      next: () => { this.saving = false; this.showModal = false; this.notify('Venta registrada. Stock actualizado.', 'success'); this.reportesService.invalidateCache(); this.load(); },
      error: (e) => { this.saving = false; this.errorMsg = e.error?.message || e.error?.Message || 'Error al registrar la venta.'; }
    });
  }

  deleteVenta(v: VentaDto) {
    if (!confirm('¿Eliminar esta venta? El stock se repondrá automáticamente.')) return;
    this.ventaService.delete(v.id).subscribe({ next: () => { this.notify('Venta eliminada. Stock repuesto.', 'success'); this.reportesService.invalidateCache(); this.load(); }, error: (e) => this.notify(e.error?.message || 'Error.', 'error') });
  }

  getLibroTitulo(id: number) { return this.libros.find(l => l.id === id)?.titulo || `Libro #${id}`; }
  getClienteNombre(id: number) { return this.clientes.find(c => c.id === id)?.nombre || `Cliente #${id}`; }
  notify(message: string, type: 'success' | 'error') { this.notification = { message, type }; setTimeout(() => this.notification = null, 4000); }
}
