import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { StockDto, StockCreateDto } from '../models/venta.interfaces';
import { PagedResult } from '../models/libro.interfaces';

@Injectable({ providedIn: 'root' })
export class StockService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/Stocks';
  private cache = signal<PagedResult<StockDto> | null>(null);
  private cachedKey = signal<string>('');

  getAll(pageNumber = 1, pageSize = 20): Observable<PagedResult<StockDto>> {
    const key = `${pageNumber}-${pageSize}`;
    if (this.cache() && this.cachedKey() === key) return of(this.cache()!);
    const params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);
    return this.http.get<PagedResult<StockDto>>(this.API_URL, { params }).pipe(
      tap(data => { this.cache.set(data); this.cachedKey.set(key); })
    );
  }

  getById(id: number): Observable<StockDto> {
    return this.http.get<StockDto>(`${this.API_URL}/${id}`);
  }

  getByLibro(libroId: number, pageNumber = 1, pageSize = 20): Observable<PagedResult<StockDto>> {
    const params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);
    return this.http.get<PagedResult<StockDto>>(`${this.API_URL}/libro/${libroId}`, { params });
  }

  create(dto: StockCreateDto): Observable<StockDto> {
    return this.http.post<StockDto>(this.API_URL, dto).pipe(tap(() => this.cache.set(null)));
  }

  update(id: number, dto: StockCreateDto): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${id}`, dto).pipe(tap(() => this.cache.set(null)));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(tap(() => this.cache.set(null)));
  }
}
