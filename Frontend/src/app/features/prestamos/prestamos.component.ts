import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrestamoService } from '../../core/services/prestamo.service';
import { LibroService } from '../../core/services/libro.service';
import { ClienteService } from '../../core/services/cliente.service';
import { PrestamoDto, PrestamoCreateDto, ClienteDto } from '../../core/models/venta.interfaces';
import { LibroDto } from '../../core/models/libro.interfaces';

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="h-full flex flex-col gap-6 animate-fade-in">
      <div class="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/5 relative overflow-hidden">
        <div class="absolute -right-10 -top-10 w-40 h-40 bg-violet-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div>
          <h2 class="text-2xl font-bold text-white tracking-tight">Préstamos</h2>
          <p class="text-slate-400 text-sm mt-1">Controla los préstamos activos y devoluciones.</p>
        </div>
        <button (click)="openAdd()" class="btn-primary flex items-center gap-2 whitespace-nowrap relative z-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          Nuevo Préstamo
        </button>
      </div>

      <div *ngIf="notification" class="p-3 rounded-lg text-sm text-center animate-fade-in"
           [ngClass]="notification.type==='success'?'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400':'bg-rose-500/10 border border-rose-500/20 text-rose-400'">
        {{ notification.message }}
      </div>

      <div *ngIf="loading" class="flex-1 flex items-center justify-center">
        <div class="text-slate-400 animate-pulse">Cargando préstamos...</div>
      </div>

      <div *ngIf="!loading" class="glass-panel rounded-2xl border border-white/5 overflow-hidden flex-1">
        <table class="w-full text-left text-sm text-slate-300">
          <thead class="text-xs uppercase bg-white/5 border-b border-white/10 text-slate-400">
            <tr>
              <th class="px-6 py-4">Libro</th>
              <th class="px-6 py-4">Cliente</th>
              <th class="px-6 py-4">F. Préstamo</th>
              <th class="px-6 py-4">F. Devolución</th>
              <th class="px-6 py-4 text-center">Estado</th>
              <th class="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr *ngIf="prestamos.length===0"><td colspan="6" class="px-6 py-10 text-center text-slate-500">No hay préstamos registrados.</td></tr>
            <tr *ngFor="let p of prestamos" class="hover:bg-white/5 transition-colors group">
              <td class="px-6 py-4 font-medium text-white">{{ getLibroTitulo(p.libroId) }}</td>
              <td class="px-6 py-4">{{ getClienteNombre(p.clienteId) }}</td>
              <td class="px-6 py-4 text-slate-400">{{ p.fechaPrestamo | date:'dd/MM/yyyy' }}</td>
              <td class="px-6 py-4 text-slate-400">{{ p.fechaDevolucion ? (p.fechaDevolucion | date:'dd/MM/yyyy') : '—' }}</td>
              <td class="px-6 py-4 text-center">
                <span *ngIf="!p.fechaDevolucion" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">Activo</span>
                <span *ngIf="p.fechaDevolucion" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Devuelto</span>
              </td>
              <td class="px-6 py-4 text-center">
                <div class="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button *ngIf="!p.fechaDevolucion" class="btn-icon" (click)="devolver(p)" title="Marcar como devuelto">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </button>
                  <button class="btn-icon danger" (click)="deletePrestamo(p)"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
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
          <h2 class="text-xl font-bold text-white">Registrar Préstamo</h2>
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
              <label class="text-sm font-medium text-slate-300 ml-1">Fecha Préstamo *</label>
              <input type="date" [(ngModel)]="form.fechaPrestamo" name="fechaPrestamo" class="input-premium" required>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300 ml-1">Fecha Devolución Esperada</label>
              <input type="date" [(ngModel)]="form.fechaDevolucion" name="fechaDevolucion" class="input-premium">
            </div>
          </div>
          <div class="pt-4 flex justify-end gap-3 border-t border-white/5">
            <button type="button" (click)="showModal=false" class="btn-secondary">Cancelar</button>
            <button type="submit" class="btn-primary" [disabled]="saving">{{ saving ? 'Registrando...' : 'Registrar Préstamo' }}</button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class PrestamosComponent implements OnInit {
  private prestamoService = inject(PrestamoService);
  private libroService = inject(LibroService);
  private clienteService = inject(ClienteService);

  prestamos: PrestamoDto[] = [];
  libros: LibroDto[] = [];
  clientes: ClienteDto[] = [];
  loading = true; showModal = false; saving = false;
  page = 1; totalPages = 0; errorMsg = '';
  notification: { message: string; type: 'success' | 'error' } | null = null;
  form: PrestamoCreateDto = { libroId: 0, clienteId: 0, fechaPrestamo: new Date().toISOString().split('T')[0], fechaDevolucion: undefined };

  ngOnInit() {
    this.load();
    this.libroService.getAll(1, 100).subscribe(r => this.libros = r.items);
    this.clienteService.getAll(1, 100).subscribe(r => this.clientes = r.items);
  }

  load() { this.loading = true; this.prestamoService.getAll(this.page).subscribe({ next: r => { this.prestamos = r.items; this.totalPages = r.totalPages; this.loading = false; }, error: () => this.loading = false }); }
  changePage(p: number) { this.page = p; this.load(); }
  openAdd() { this.form = { libroId: 0, clienteId: 0, fechaPrestamo: new Date().toISOString().split('T')[0], fechaDevolucion: undefined }; this.errorMsg = ''; this.showModal = true; }
  save() {
    this.saving = true; this.errorMsg = '';
    this.prestamoService.create(this.form).subscribe({
      next: () => { this.saving = false; this.showModal = false; this.notify('Préstamo registrado. Stock descontado.', 'success'); this.load(); },
      error: (e) => { this.saving = false; this.errorMsg = e.error?.message || e.error?.Message || 'Error al registrar.'; }
    });
  }
  devolver(p: PrestamoDto) {
    if (!confirm(`¿Marcar como devuelto el préstamo de "${this.getLibroTitulo(p.libroId)}"? El stock se repondrá.`)) return;
    this.prestamoService.devolver(p.id).subscribe({ next: () => { this.notify('Devolución registrada. Stock repuesto.', 'success'); this.load(); }, error: (e) => this.notify(e.error?.message || 'Error.', 'error') });
  }
  deletePrestamo(p: PrestamoDto) {
    if (!confirm('¿Eliminar este préstamo?')) return;
    this.prestamoService.delete(p.id).subscribe({ next: () => { this.notify('Préstamo eliminado.', 'success'); this.load(); }, error: (e) => this.notify(e.error?.message || 'Error.', 'error') });
  }
  getLibroTitulo(id: number) { return this.libros.find(l => l.id === id)?.titulo || `Libro #${id}`; }
  getClienteNombre(id: number) { return this.clientes.find(c => c.id === id)?.nombre || `Cliente #${id}`; }
  notify(message: string, type: 'success' | 'error') { this.notification = { message, type }; setTimeout(() => this.notification = null, 4000); }
}
