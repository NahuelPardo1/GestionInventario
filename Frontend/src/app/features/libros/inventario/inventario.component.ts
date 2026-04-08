import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibroFormComponent } from '../libro-form/libro-form.component';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule, LibroFormComponent],
  template: `
    <div class="h-full flex flex-col gap-6 animate-fade-in">
      
      <!-- Premium Header / Filter Area -->
      <div class="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/5 relative overflow-hidden">
        
        <!-- Decoration -->
        <div class="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div>
          <h2 class="text-2xl font-bold text-white tracking-tight">Inventario de Libros</h2>
          <p class="text-slate-400 text-sm mt-1">Gestiona el stock, agrega nuevos títulos y administra tu biblioteca.</p>
        </div>

        <div class="flex items-center gap-3 w-full md:w-auto relative z-10">
          <div class="relative w-full md:w-64">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" [(ngModel)]="searchTerm" placeholder="Buscar libro..." class="input-premium pl-10 w-full text-sm">
          </div>
          
          <button (click)="openAddModal()" class="btn-primary flex items-center justify-center gap-2 whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Añadir Libro
          </button>
        </div>
      </div>

      <!-- Data Table -->
      <div class="glass-panel rounded-2xl flex-1 border border-white/5 overflow-hidden flex flex-col">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-slate-300">
            <thead class="text-xs uppercase bg-white/5 border-b border-white/10 text-slate-400">
              <tr>
                <th scope="col" class="px-6 py-4 font-semibold">Libro</th>
                <th scope="col" class="px-6 py-4 font-semibold">ISBN</th>
                <th scope="col" class="px-6 py-4 font-semibold">Categoría</th>
                <th scope="col" class="px-6 py-4 font-semibold text-right">Precio</th>
                <th scope="col" class="px-6 py-4 font-semibold text-center">Stock</th>
                <th scope="col" class="px-6 py-4 font-semibold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              <!-- Placeholder Data -->
              <tr *ngFor="let libro of filteredLibros()" class="hover:bg-white/5 transition-colors group">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium text-white">{{ libro.titulo }}</div>
                  <div class="text-xs text-slate-500">{{ libro.autor }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap font-mono text-xs">{{ libro.isbn }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {{ libro.genero }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right font-medium text-white">\${{ libro.precio }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span [class]="getStockClass(libro.stock)" class="inline-flex items-center px-2 py-1 rounded text-xs font-semibold">
                    {{ libro.stock }} uds
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <div class="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <!-- Edit Button -->
                    <button class="btn-icon" (click)="openEditModal(libro)" title="Editar">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <!-- Delete Button -->
                    <button class="btn-icon danger" (click)="deleteLibro(libro)" title="Eliminar">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- The overlay component -->
    <app-libro-form 
      [isOpen]="showModal" 
      [isEdit]="isEditMode" 
      [libro]="currentLibro"
      (closeEvent)="closeModal()"
      (saveEvent)="handleSave($event)">
    </app-libro-form>
  `
})
export class InventarioComponent {
  searchTerm: string = '';
  showModal: boolean = false;
  isEditMode: boolean = false;
  currentLibro: any = {};

  libros = [
    { id: 1, titulo: 'El Color de la Magia', autor: 'Terry Pratchett', isbn: '978-84-01-38100-3', precio: 15.99, stock: 42, genero: 'Fantasía' },
    { id: 2, titulo: 'Clean Code', autor: 'Robert C. Martin', isbn: '978-0-13-235088-4', precio: 45.00, stock: 5, genero: 'Ciencia' },
    { id: 3, titulo: '1984', autor: 'George Orwell', isbn: '978-0-452-28423-4', precio: 12.50, stock: 0, genero: 'Ficción' },
  ];

  filteredLibros() {
    if (!this.searchTerm) return this.libros;
    return this.libros.filter(l => 
      l.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      l.autor.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      l.isbn.includes(this.searchTerm)
    );
  }

  getStockClass(stock: number): string {
    if (stock > 10) return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    if (stock > 0) return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
  }

  openAddModal() {
    this.isEditMode = false;
    this.currentLibro = { titulo: '', autor: '', isbn: '', precio: 0, stock: 0, genero: '' };
    this.showModal = true;
  }

  openEditModal(libro: any) {
    this.isEditMode = true;
    this.currentLibro = { ...libro };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  handleSave(libro: any) {
    if (this.isEditMode) {
      const index = this.libros.findIndex(l => l.id === libro.id);
      if (index !== -1) this.libros[index] = libro;
    } else {
      libro.id = Math.random();
      this.libros.push(libro);
    }
  }

  deleteLibro(libro: any) {
    if(confirm(`¿Estás seguro de eliminar "${libro.titulo}"?`)) {
      this.libros = this.libros.filter(l => l.id !== libro.id);
    }
  }
}
