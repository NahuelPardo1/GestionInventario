import { Component, EventEmitter, Output, Input, OnInit, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutorDto, CategoriaDto, LibroCreateDto } from '../../../core/models/libro.interfaces';
import { AutorService, CategoriaService } from '../../../core/services/catalogo.service';

@Component({
  selector: 'app-libro-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Overlay setup with backdrop blur -->
    <div *ngIf="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      
      <!-- Modal Panel -->
      <div class="glass-panel border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl relative animate-fade-in" style="animation-duration: 0.2s;">
        
        <!-- Header -->
        <div class="px-6 py-5 border-b border-white/5 flex items-center justify-between">
          <h2 class="text-xl font-bold text-white">{{ isEdit ? 'Editar Libro' : 'Añadir Nuevo Libro' }}</h2>
          <button type="button" (click)="close()" class="btn-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Error message -->
        <div *ngIf="errorMessage" class="mx-6 mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center animate-fade-in">
          {{ errorMessage }}
        </div>

        <!-- Form content -->
        <form (ngSubmit)="save()" class="p-6 space-y-4">
          
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-300 ml-1">Título del Libro *</label>
            <input type="text" [(ngModel)]="formData.titulo" name="titulo" class="input-premium" required placeholder="Ej. El Señor de los Anillos">
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300 ml-1">Autor *</label>
              <select [(ngModel)]="formData.autorId" name="autorId" class="input-premium appearance-none bg-slate-800/50" required>
                <option [ngValue]="0" disabled>Seleccionar autor...</option>
                <option *ngFor="let autor of autores" [ngValue]="autor.id">{{ autor.nombre }}</option>
              </select>
            </div>
            
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300 ml-1">Categoría</label>
              <select [(ngModel)]="formData.categoriaId" name="categoriaId" class="input-premium appearance-none bg-slate-800/50">
                <option [ngValue]="undefined">Sin categoría</option>
                <option *ngFor="let cat of categorias" [ngValue]="cat.id">{{ cat.nombre }}</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300 ml-1">Precio *</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input type="number" [(ngModel)]="formData.precio" name="precio" class="input-premium pl-8" required min="0" step="0.01">
              </div>
            </div>
            
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300 ml-1">Fecha Publicación</label>
              <input type="date" [(ngModel)]="formData.fechaPublicacion" name="fechaPublicacion" class="input-premium">
            </div>
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-300 ml-1">URL de Imagen (opcional)</label>
            <input type="url" [(ngModel)]="formData.imagenURL" name="imagenURL" class="input-premium" placeholder="https://...">
          </div>

          <!-- Actions Footer -->
          <div class="pt-6 flex items-center justify-end gap-3 border-t border-white/5 mt-6">
            <button type="button" (click)="close()" class="btn-secondary">Cancelar</button>
            <button type="submit" class="btn-primary flex items-center gap-2" [disabled]="saving">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ saving ? 'Guardando...' : 'Guardar Libro' }}
            </button>
          </div>

        </form>
      </div>
    </div>
  `
})
export class LibroFormComponent implements OnInit, OnChanges {
  private autorService = inject(AutorService);
  private categoriaService = inject(CategoriaService);

  @Input() isOpen = false;
  @Input() isEdit = false;
  @Input() libroId: number | null = null;
  @Input() libroData: LibroCreateDto | null = null;
  
  @Output() closeEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<LibroCreateDto>();

  autores: AutorDto[] = [];
  categorias: CategoriaDto[] = [];
  errorMessage = '';
  saving = false;

  formData: LibroCreateDto = {
    titulo: '',
    autorId: 0,
    precio: 0,
    fechaPublicacion: undefined,
    imagenURL: undefined,
    categoriaId: undefined
  };

  ngOnInit() {
    this.autorService.getAll().subscribe(data => this.autores = data);
    this.categoriaService.getAll().subscribe(data => this.categorias = data);
  }

  ngOnChanges() {
    if (this.libroData) {
      this.formData = { ...this.libroData };
    } else {
      this.resetForm();
    }
    this.errorMessage = '';
  }

  close() {
    this.errorMessage = '';
    this.closeEvent.emit();
  }

  save() {
    if (!this.formData.titulo || !this.formData.autorId || this.formData.precio <= 0) {
      this.errorMessage = 'Por favor completa todos los campos obligatorios.';
      return;
    }
    this.saving = true;
    this.saveEvent.emit(this.formData);
  }

  resetSaving() {
    this.saving = false;
  }

  private resetForm() {
    this.formData = {
      titulo: '',
      autorId: 0,
      precio: 0,
      fechaPublicacion: undefined,
      imagenURL: undefined,
      categoriaId: undefined
    };
  }
}
