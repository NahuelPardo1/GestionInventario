import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { PrestamoDto, PrestamoCreateDto } from '../models/venta.interfaces';
import { PagedResult } from '../models/libro.interfaces';

@Injectable({ providedIn: 'root' })
export class PrestamoService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/Prestamos';
  private cache = signal<PagedResult<PrestamoDto> | null>(null);
  private cachedKey = signal<string>('');

  getAll(pageNumber = 1, pageSize = 20): Observable<PagedResult<PrestamoDto>> {
    const key = `${pageNumber}-${pageSize}`;
    if (this.cache() && this.cachedKey() === key) return of(this.cache()!);
    const params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);
    return this.http.get<PagedResult<PrestamoDto>>(this.API_URL, { params }).pipe(
      tap(data => { this.cache.set(data); this.cachedKey.set(key); })
    );
  }

  getById(id: number): Observable<PrestamoDto> {
    return this.http.get<PrestamoDto>(`${this.API_URL}/${id}`);
  }

  create(dto: PrestamoCreateDto): Observable<PrestamoDto> {
    return this.http.post<PrestamoDto>(this.API_URL, dto).pipe(tap(() => this.cache.set(null)));
  }

  update(id: number, dto: PrestamoCreateDto): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${id}`, dto).pipe(tap(() => this.cache.set(null)));
  }

  devolver(id: number): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.API_URL}/${id}/devolver`, {}).pipe(
      tap(() => this.cache.set(null))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(tap(() => this.cache.set(null)));
  }
}
