import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

        <!-- Form content -->
        <form (ngSubmit)="save()" class="p-6 space-y-4">
          
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-300 ml-1">Título del Libro *</label>
            <input type="text" [(ngModel)]="libro.titulo" name="titulo" class="input-premium" required placeholder="Ej. El Señor de los Anillos">
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300 ml-1">Autor *</label>
              <input type="text" [(ngModel)]="libro.autor" name="autor" class="input-premium" required placeholder="J.R.R. Tolkien">
            </div>
            
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300 ml-1">ISBN</label>
              <input type="text" [(ngModel)]="libro.isbn" name="isbn" class="input-premium" placeholder="978-3-16-148410-0">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300 ml-1">Precio *</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input type="number" [(ngModel)]="libro.precio" name="precio" class="input-premium pl-8" required min="0" step="0.01">
              </div>
            </div>
            
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300 ml-1">Stock Inicial *</label>
              <input type="number" [(ngModel)]="libro.stock" name="stock" class="input-premium" required min="0">
            </div>
          </div>
          
          <div class="space-y-2">
             <label class="text-sm font-medium text-slate-300 ml-1">Género / Categoría</label>
             <select [(ngModel)]="libro.genero" name="genero" class="input-premium appearance-none bg-slate-800/50">
               <option value="" disabled selected>Seleccionar categoría...</option>
               <option value="Ficción">Ficción</option>
               <option value="No Ficción">No Ficción</option>
               <option value="Ciencia">Ciencia</option>
               <option value="Fantasía">Fantasía</option>
             </select>
          </div>

          <!-- Actions Footer -->
          <div class="pt-6 flex items-center justify-end gap-3 border-t border-white/5 mt-6">
            <button type="button" (click)="close()" class="btn-secondary">Cancelar</button>
            <button type="submit" class="btn-primary flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Guardar Libro
            </button>
          </div>

        </form>
      </div>
    </div>
  `
})
export class LibroFormComponent {
  @Input() isOpen = false;
  @Input() isEdit = false;
  @Input() libro: any = { titulo: '', autor: '', isbn: '', precio: 0, stock: 0, genero: '' };
  
  @Output() closeEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<any>();

  close() {
    this.closeEvent.emit();
  }

  save() {
    this.saveEvent.emit(this.libro);
    this.close();
  }
}
