import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibroFormComponent } from '../libro-form/libro-form.component';
import { LibroService } from '../../../core/services/libro.service';
import { AutorService, CategoriaService } from '../../../core/services/catalogo.service';
import { LibroDto, LibroCreateDto, AutorDto, CategoriaDto } from '../../../core/models/libro.interfaces';

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
            <input type="text" [(ngModel)]="searchTerm" (ngModelChange)="onSearch()" placeholder="Buscar por título..." class="input-premium pl-10 w-full text-sm">
          </div>
          
          <button (click)="openAddModal()" class="btn-primary flex items-center justify-center gap-2 whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Añadir Libro
          </button>
        </div>
      </div>

      <!-- Notification toast -->
      <div *ngIf="notification" class="p-3 rounded-lg text-sm text-center animate-fade-in"
           [ngClass]="notification.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'">
        {{ notification.message }}
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="flex-1 flex items-center justify-center">
        <div class="text-slate-400 animate-pulse text-lg">Cargando inventario...</div>
      </div>

      <!-- Data Table -->
      <div *ngIf="!loading" class="glass-panel rounded-2xl flex-1 border border-white/5 overflow-hidden flex flex-col">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-slate-300">
            <thead class="text-xs uppercase bg-white/5 border-b border-white/10 text-slate-400">
              <tr>
                <th scope="col" class="px-6 py-4 font-semibold">Libro</th>
                <th scope="col" class="px-6 py-4 font-semibold">Autor</th>
                <th scope="col" class="px-6 py-4 font-semibold">Categoría</th>
                <th scope="col" class="px-6 py-4 font-semibold text-right">Precio</th>
                <th scope="col" class="px-6 py-4 font-semibold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              <tr *ngIf="libros.length === 0">
                <td colspan="5" class="px-6 py-10 text-center text-slate-500">No se encontraron libros.</td>
              </tr>
              <tr *ngFor="let libro of libros" class="hover:bg-white/5 transition-colors group">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium text-white">{{ libro.titulo }}</div>
                  <div class="text-xs text-slate-500">ID: {{ libro.id }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">{{ getAutorNombre(libro.autorId) }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {{ getCategoriaNombre(libro.categoriaId) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right font-medium text-white">\${{ libro.precio | number:'1.2-2' }}</td>
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

        <!-- Pagination -->
        <div *ngIf="totalPages > 1" class="flex items-center justify-between px-6 py-4 border-t border-white/5">
          <span class="text-sm text-slate-400">Página {{ currentPage }} de {{ totalPages }} ({{ totalCount }} libros)</span>
          <div class="flex gap-2">
            <button (click)="changePage(currentPage - 1)" [disabled]="currentPage <= 1" class="btn-secondary text-sm px-3 py-1.5">← Anterior</button>
            <button (click)="changePage(currentPage + 1)" [disabled]="currentPage >= totalPages" class="btn-secondary text-sm px-3 py-1.5">Siguiente →</button>
          </div>
        </div>
      </div>
    </div>

    <!-- The overlay component -->
    <app-libro-form 
      [isOpen]="showModal" 
      [isEdit]="isEditMode"
      [libroId]="editingLibroId"
      [libroData]="currentLibroData"
      (closeEvent)="closeModal()"
      (saveEvent)="handleSave($event)">
    </app-libro-form>
  `
})
export class InventarioComponent implements OnInit {
  @ViewChild(LibroFormComponent) formComponent!: LibroFormComponent;

  private libroService = inject(LibroService);
  private autorService = inject(AutorService);
  private categoriaService = inject(CategoriaService);

  searchTerm = '';
  showModal = false;
  isEditMode = false;
  editingLibroId: number | null = null;
  currentLibroData: LibroCreateDto | null = null;
  loading = true;
  notification: { message: string; type: 'success' | 'error' } | null = null;

  libros: LibroDto[] = [];
  autores: AutorDto[] = [];
  categorias: CategoriaDto[] = [];

  currentPage = 1;
  pageSize = 10;
  totalCount = 0;
  totalPages = 0;

  private searchTimeout: any;

  ngOnInit() {
    this.loadCatalogs();
    this.loadLibros();
  }

  loadCatalogs() {
    this.autorService.getAll().subscribe(data => this.autores = data);
    this.categoriaService.getAll().subscribe(data => this.categorias = data);
  }

  loadLibros() {
    this.loading = true;
    const obs = this.searchTerm
      ? this.libroService.search(this.searchTerm, undefined, undefined, this.currentPage, this.pageSize)
      : this.libroService.getAll(this.currentPage, this.pageSize);

    obs.subscribe({
      next: (result) => {
        this.libros = result.items;
        this.totalCount = result.totalCount;
        this.totalPages = result.totalPages;
        this.loading = false;
      },
      error: () => {
        this.showNotification('Error al cargar los libros.', 'error');
        this.loading = false;
      }
    });
  }

  onSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.currentPage = 1;
      this.loadLibros();
    }, 400);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadLibros();
  }

  getAutorNombre(autorId: number): string {
    return this.autores.find(a => a.id === autorId)?.nombre || `Autor #${autorId}`;
  }

  getCategoriaNombre(categoriaId: number): string {
    return this.categorias.find(c => c.id === categoriaId)?.nombre || 'Sin categoría';
  }

  openAddModal() {
    this.isEditMode = false;
    this.editingLibroId = null;
    this.currentLibroData = null;
    this.showModal = true;
  }

  openEditModal(libro: LibroDto) {
    this.isEditMode = true;
    this.editingLibroId = libro.id;
    this.currentLibroData = {
      titulo: libro.titulo,
      autorId: libro.autorId,
      precio: libro.precio,
      fechaPublicacion: libro.fechaPublicacion,
      imagenURL: libro.imagenURL,
      categoriaId: libro.categoriaId
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  handleSave(data: LibroCreateDto) {
    if (this.isEditMode && this.editingLibroId) {
      this.libroService.update(this.editingLibroId, data).subscribe({
        next: () => {
          this.showNotification('Libro actualizado correctamente.', 'success');
          this.closeModal();
          this.formComponent?.resetSaving();
          this.loadLibros();
        },
        error: (err) => {
          this.formComponent?.resetSaving();
          this.showNotification(err.error?.message || err.error?.Message || 'Error al actualizar.', 'error');
        }
      });
    } else {
      this.libroService.create(data).subscribe({
        next: () => {
          this.showNotification('Libro creado correctamente.', 'success');
          this.closeModal();
          this.formComponent?.resetSaving();
          this.loadLibros();
        },
        error: (err) => {
          this.formComponent?.resetSaving();
          this.showNotification(err.error?.message || err.error?.Message || 'Error al crear el libro.', 'error');
        }
      });
    }
  }

  deleteLibro(libro: LibroDto) {
    if (confirm(`¿Estás seguro de eliminar "${libro.titulo}"?`)) {
      this.libroService.delete(libro.id).subscribe({
        next: () => {
          this.showNotification('Libro eliminado correctamente.', 'success');
          this.loadLibros();
        },
        error: (err) => {
          this.showNotification(err.error?.message || err.error?.Message || 'Error al eliminar.', 'error');
        }
      });
    }
  }

  private showNotification(message: string, type: 'success' | 'error') {
    this.notification = { message, type };
    setTimeout(() => this.notification = null, 4000);
  }
}
