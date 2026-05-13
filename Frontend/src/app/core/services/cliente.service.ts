import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { ClienteDto, ClienteCreateDto } from '../models/venta.interfaces';
import { PagedResult } from '../models/libro.interfaces';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/Clientes';
  private cache = signal<PagedResult<ClienteDto> | null>(null);
  private cachedKey = signal<string>('');

  getAll(pageNumber = 1, pageSize = 20): Observable<PagedResult<ClienteDto>> {
    const key = `${pageNumber}-${pageSize}`;
    if (this.cache() && this.cachedKey() === key) return of(this.cache()!);
    const params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);
    return this.http.get<PagedResult<ClienteDto>>(this.API_URL, { params }).pipe(
      tap(data => { this.cache.set(data); this.cachedKey.set(key); })
    );
  }

  getById(id: number): Observable<ClienteDto> {
    return this.http.get<ClienteDto>(`${this.API_URL}/${id}`);
  }

  create(dto: ClienteCreateDto): Observable<ClienteDto> {
    return this.http.post<ClienteDto>(this.API_URL, dto).pipe(tap(() => this.cache.set(null)));
  }

  update(id: number, dto: ClienteCreateDto): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${id}`, dto).pipe(tap(() => this.cache.set(null)));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(tap(() => this.cache.set(null)));
  }
}
