import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { AutorDto, AutorCreateDto, CategoriaDto, CategoriaCreateDto } from '../models/libro.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/Autores';
  private cache = signal<AutorDto[] | null>(null);

  getAll(): Observable<AutorDto[]> {
    if (this.cache()) return of(this.cache()!);
    return this.http.get<AutorDto[]>(this.API_URL).pipe(
      tap(data => this.cache.set(data))
    );
  }

  getById(id: number): Observable<AutorDto> {
    return this.http.get<AutorDto>(`${this.API_URL}/${id}`);
  }

  create(autor: AutorCreateDto): Observable<AutorDto> {
    return this.http.post<AutorDto>(this.API_URL, autor).pipe(
      tap(() => this.cache.set(null))
    );
  }

  update(id: number, autor: AutorCreateDto): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${id}`, autor).pipe(
      tap(() => this.cache.set(null))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(() => this.cache.set(null))
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/Categorias';
  private cache = signal<CategoriaDto[] | null>(null);

  getAll(): Observable<CategoriaDto[]> {
    if (this.cache()) return of(this.cache()!);
    return this.http.get<CategoriaDto[]>(this.API_URL).pipe(
      tap(data => this.cache.set(data))
    );
  }

  getById(id: number): Observable<CategoriaDto> {
    return this.http.get<CategoriaDto>(`${this.API_URL}/${id}`);
  }

  create(categoria: CategoriaCreateDto): Observable<CategoriaDto> {
    return this.http.post<CategoriaDto>(this.API_URL, categoria).pipe(
      tap(() => this.cache.set(null))
    );
  }

  update(id: number, categoria: CategoriaCreateDto): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${id}`, categoria).pipe(
      tap(() => this.cache.set(null))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(() => this.cache.set(null))
    );
  }
}
