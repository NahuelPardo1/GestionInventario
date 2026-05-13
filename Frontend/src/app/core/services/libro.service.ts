import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { LibroDto, LibroCreateDto, PagedResult } from '../models/libro.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/Libros';

  // Caché de la última página consultada
  private cachedResult = signal<PagedResult<LibroDto> | null>(null);
  private cachedKey = signal<string>('');

  getAll(pageNumber = 1, pageSize = 10): Observable<PagedResult<LibroDto>> {
    const key = `all-${pageNumber}-${pageSize}`;
    if (this.cachedResult() && this.cachedKey() === key) {
      return of(this.cachedResult()!);
    }
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PagedResult<LibroDto>>(this.API_URL, { params }).pipe(
      tap(data => {
        this.cachedResult.set(data);
        this.cachedKey.set(key);
      })
    );
  }

  search(titulo?: string, autorId?: number, categoriaId?: number, pageNumber = 1, pageSize = 10): Observable<PagedResult<LibroDto>> {
    // Las búsquedas no se cachean para siempre tener resultados frescos
    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    if (titulo) params = params.set('titulo', titulo);
    if (autorId) params = params.set('autorId', autorId);
    if (categoriaId) params = params.set('categoriaId', categoriaId);
    return this.http.get<PagedResult<LibroDto>>(`${this.API_URL}/buscar`, { params });
  }

  getById(id: number): Observable<LibroDto> {
    return this.http.get<LibroDto>(`${this.API_URL}/${id}`);
  }

  create(libro: LibroCreateDto): Observable<LibroDto> {
    return this.http.post<LibroDto>(this.API_URL, libro).pipe(
      tap(() => this.invalidateCache())
    );
  }

  update(id: number, libro: LibroCreateDto): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${id}`, libro).pipe(
      tap(() => this.invalidateCache())
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(() => this.invalidateCache())
    );
  }

  /** Se invalida automáticamente tras crear/editar/eliminar */
  invalidateCache() {
    this.cachedResult.set(null);
    this.cachedKey.set('');
  }
}
