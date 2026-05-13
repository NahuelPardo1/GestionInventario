import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { VentaDto, VentaCreateDto } from '../models/venta.interfaces';
import { PagedResult } from '../models/libro.interfaces';

@Injectable({ providedIn: 'root' })
export class VentaService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/Ventas';
  private cache = signal<PagedResult<VentaDto> | null>(null);
  private cachedKey = signal<string>('');

  getAll(pageNumber = 1, pageSize = 20): Observable<PagedResult<VentaDto>> {
    const key = `${pageNumber}-${pageSize}`;
    if (this.cache() && this.cachedKey() === key) return of(this.cache()!);
    const params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);
    return this.http.get<PagedResult<VentaDto>>(this.API_URL, { params }).pipe(
      tap(data => { this.cache.set(data); this.cachedKey.set(key); })
    );
  }

  getById(id: number): Observable<VentaDto> {
    return this.http.get<VentaDto>(`${this.API_URL}/${id}`);
  }

  create(dto: VentaCreateDto): Observable<VentaDto> {
    return this.http.post<VentaDto>(this.API_URL, dto).pipe(tap(() => this.cache.set(null)));
  }

  update(id: number, dto: VentaCreateDto): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${id}`, dto).pipe(tap(() => this.cache.set(null)));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(tap(() => this.cache.set(null)));
  }
}
