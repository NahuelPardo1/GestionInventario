import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../core/services/cliente.service';
import { ClienteDto, ClienteCreateDto } from '../../core/models/venta.interfaces';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="h-full flex flex-col gap-6 animate-fade-in">
      <div class="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/5 relative overflow-hidden">
        <div class="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div>
          <h2 class="text-2xl font-bold text-white tracking-tight">Clientes</h2>
          <p class="text-slate-400 text-sm mt-1">Gestiona la base de clientes.</p>
        </div>
        <button (click)="openAdd()" class="btn-primary flex items-center gap-2 whitespace-nowrap relative z-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          Añadir Cliente
        </button>
      </div>

      <div *ngIf="notification" class="p-3 rounded-lg text-sm text-center animate-fade-in"
           [ngClass]="notification.type==='success'?'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400':'bg-rose-500/10 border border-rose-500/20 text-rose-400'">
        {{ notification.message }}
      </div>

      <div *ngIf="loading" class="flex-1 flex items-center justify-center">
        <div class="text-slate-400 animate-pulse">Cargando clientes...</div>
      </div>

      <div *ngIf="!loading" class="glass-panel rounded-2xl border border-white/5 overflow-hidden flex-1">
        <table class="w-full text-left text-sm text-slate-300">
          <thead class="text-xs uppercase bg-white/5 border-b border-white/10 text-slate-400">
            <tr>
              <th class="px-6 py-4">Nombre</th>
              <th class="px-6 py-4">Email</th>
              <th class="px-6 py-4">Teléfono</th>
              <th class="px-6 py-4">Dirección</th>
              <th class="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr *ngIf="clientes.length===0"><td colspan="5" class="px-6 py-10 text-center text-slate-500">No hay clientes registrados.</td></tr>
            <tr *ngFor="let c of clientes" class="hover:bg-white/5 transition-colors group">
              <td class="px-6 py-4 font-medium text-white">{{ c.nombre }}</td>
              <td class="px-6 py-4 text-slate-400">{{ c.email }}</td>
              <td class="px-6 py-4">{{ c.telefono }}</td>
              <td class="px-6 py-4 max-w-xs truncate text-slate-400">{{ c.direccion }}</td>
              <td class="px-6 py-4 text-center">
                <div class="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button class="btn-icon" (click)="openEdit(c)"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button>
                  <button class="btn-icon danger" (click)="deleteCliente(c)"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
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
          <h2 class="text-xl font-bold text-white">{{ isEdit ? 'Editar Cliente' : 'Añadir Cliente' }}</h2>
          <button (click)="showModal=false" class="btn-icon"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
        </div>
        <div *ngIf="errorMsg" class="mx-6 mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">{{ errorMsg }}</div>
        <form (ngSubmit)="save()" class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2 col-span-2">
              <label class="text-sm font-medium text-slate-300 ml-1">Nombre *</label>
              <input type="text" [(ngModel)]="form.nombre" name="nombre" class="input-premium" required placeholder="Juan Pérez">
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300 ml-1">Email *</label>
              <input type="email" [(ngModel)]="form.email" name="email" class="input-premium" required placeholder="juan@email.com">
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300 ml-1">Teléfono</label>
              <input type="text" [(ngModel)]="form.telefono" name="telefono" class="input-premium" placeholder="+54 9 11 1234-5678">
            </div>
            <div class="space-y-2 col-span-2">
              <label class="text-sm font-medium text-slate-300 ml-1">Dirección</label>
              <input type="text" [(ngModel)]="form.direccion" name="direccion" class="input-premium" placeholder="Av. Corrientes 1234, Buenos Aires">
            </div>
          </div>
          <div class="pt-4 flex justify-end gap-3 border-t border-white/5">
            <button type="button" (click)="showModal=false" class="btn-secondary">Cancelar</button>
            <button type="submit" class="btn-primary" [disabled]="saving">{{ saving ? 'Guardando...' : 'Guardar' }}</button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ClientesComponent implements OnInit {
  private service = inject(ClienteService);
  clientes: ClienteDto[] = [];
  loading = true; showModal = false; isEdit = false; saving = false;
  editingId: number | null = null; errorMsg = '';
  page = 1; totalPages = 0;
  notification: { message: string; type: 'success' | 'error' } | null = null;
  form: ClienteCreateDto = { nombre: '', email: '', telefono: '', direccion: '' };

  ngOnInit() { this.load(); }
  load() { this.loading = true; this.service.getAll(this.page).subscribe({ next: r => { this.clientes = r.items; this.totalPages = r.totalPages; this.loading = false; }, error: () => this.loading = false }); }
  changePage(p: number) { this.page = p; this.load(); }
  openAdd() { this.isEdit = false; this.editingId = null; this.form = { nombre: '', email: '', telefono: '', direccion: '' }; this.errorMsg = ''; this.showModal = true; }
  openEdit(c: ClienteDto) { this.isEdit = true; this.editingId = c.id; this.form = { nombre: c.nombre, email: c.email, telefono: c.telefono, direccion: c.direccion }; this.errorMsg = ''; this.showModal = true; }
  save() {
    this.saving = true; this.errorMsg = '';
    const onSuccess = () => { this.saving = false; this.showModal = false; this.notify('Cliente guardado.', 'success'); this.load(); };
    const onError = (e: any) => { this.saving = false; this.errorMsg = e.error?.message || 'Error al guardar.'; };
    if (this.isEdit) {
      this.service.update(this.editingId!, this.form).subscribe({ next: onSuccess, error: onError });
    } else {
      this.service.create(this.form).subscribe({ next: () => onSuccess(), error: onError });
    }
  }
  deleteCliente(c: ClienteDto) {
    if (!confirm(`¿Eliminar a "${c.nombre}"?`)) return;
    this.service.delete(c.id).subscribe({ next: () => { this.notify('Cliente eliminado.', 'success'); this.load(); }, error: (e) => this.notify(e.error?.message || 'Error.', 'error') });
  }
  notify(message: string, type: 'success' | 'error') { this.notification = { message, type }; setTimeout(() => this.notification = null, 4000); }
}
