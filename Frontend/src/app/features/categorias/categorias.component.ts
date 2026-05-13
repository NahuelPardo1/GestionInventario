import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../core/services/catalogo.service';
import { CategoriaDto, CategoriaCreateDto } from '../../core/models/libro.interfaces';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="h-full flex flex-col gap-6 animate-fade-in">
      <div class="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/5 relative overflow-hidden">
        <div class="absolute -right-10 -top-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div>
          <h2 class="text-2xl font-bold text-white tracking-tight">Categorías</h2>
          <p class="text-slate-400 text-sm mt-1">Gestiona las categorías literarias del catálogo.</p>
        </div>
        <button (click)="openAdd()" class="btn-primary flex items-center gap-2 whitespace-nowrap relative z-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          Añadir Categoría
        </button>
      </div>

      <div *ngIf="notification" class="p-3 rounded-lg text-sm text-center animate-fade-in"
           [ngClass]="notification.type==='success'?'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400':'bg-rose-500/10 border border-rose-500/20 text-rose-400'">
        {{ notification.message }}
      </div>

      <div *ngIf="loading" class="flex-1 flex items-center justify-center">
        <div class="text-slate-400 animate-pulse">Cargando categorías...</div>
      </div>

      <div *ngIf="!loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div *ngFor="let c of categorias" class="glass-panel rounded-2xl p-5 border border-white/5 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
          <div class="absolute -right-4 -bottom-4 w-16 h-16 bg-cyan-500/10 rounded-full blur-lg group-hover:bg-cyan-500/20 transition-all"></div>
          <div class="flex items-start justify-between relative z-10">
            <div>
              <div class="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a2 2 0 012-2z"/></svg>
              </div>
              <h3 class="text-white font-semibold">{{ c.nombre }}</h3>
              <p class="text-slate-500 text-xs mt-1">ID: {{ c.id }}</p>
            </div>
            <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button class="btn-icon" (click)="openEdit(c)"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button>
              <button class="btn-icon danger" (click)="deleteCategoria(c)"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
            </div>
          </div>
        </div>
        <div *ngIf="categorias.length===0" class="col-span-full text-center text-slate-500 py-10">No hay categorías registradas.</div>
      </div>
    </div>

    <div *ngIf="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div class="glass-panel border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl animate-fade-in">
        <div class="px-6 py-5 border-b border-white/5 flex items-center justify-between">
          <h2 class="text-xl font-bold text-white">{{ isEdit ? 'Editar Categoría' : 'Añadir Categoría' }}</h2>
          <button (click)="showModal=false" class="btn-icon"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
        </div>
        <div *ngIf="errorMsg" class="mx-6 mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">{{ errorMsg }}</div>
        <form (ngSubmit)="save()" class="p-6 space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-300 ml-1">Nombre *</label>
            <input type="text" [(ngModel)]="form.nombre" name="nombre" class="input-premium" required placeholder="Ej: Ciencia Ficción">
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
export class CategoriasComponent implements OnInit {
  private service = inject(CategoriaService);
  categorias: CategoriaDto[] = [];
  loading = true; showModal = false; isEdit = false; saving = false;
  editingId: number | null = null; errorMsg = '';
  notification: { message: string; type: 'success' | 'error' } | null = null;
  form: CategoriaCreateDto = { nombre: '' };

  ngOnInit() { this.load(); }
  load() { this.loading = true; this.service.getAll().subscribe({ next: d => { this.categorias = d; this.loading = false; }, error: () => this.loading = false }); }
  openAdd() { this.isEdit = false; this.editingId = null; this.form = { nombre: '' }; this.errorMsg = ''; this.showModal = true; }
  openEdit(c: CategoriaDto) { this.isEdit = true; this.editingId = c.id; this.form = { nombre: c.nombre }; this.errorMsg = ''; this.showModal = true; }
  save() {
    this.saving = true; this.errorMsg = '';
    const onSuccess = () => { this.saving = false; this.showModal = false; this.notify('Categoría guardada.', 'success'); this.load(); };
    const onError = (e: any) => { this.saving = false; this.errorMsg = e.error?.message || 'Error al guardar.'; };
    if (this.isEdit) {
      this.service.update(this.editingId!, this.form).subscribe({ next: onSuccess, error: onError });
    } else {
      this.service.create(this.form).subscribe({ next: () => onSuccess(), error: onError });
    }
  }
  deleteCategoria(c: CategoriaDto) {
    if (!confirm(`¿Eliminar "${c.nombre}"?`)) return;
    this.service.delete(c.id).subscribe({ next: () => { this.notify('Categoría eliminada.', 'success'); this.load(); }, error: (e) => this.notify(e.error?.message || 'Error.', 'error') });
  }
  notify(message: string, type: 'success' | 'error') { this.notification = { message, type }; setTimeout(() => this.notification = null, 4000); }
}
