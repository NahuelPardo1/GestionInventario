import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { DashboardDto, AnalisisFinancieroDto } from '../models/reportes.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/Reportes';

  // Caché en memoria — se conserva mientras la app esté abierta
  private dashboardCache = signal<DashboardDto | null>(null);
  private financieroCache = new Map<number, AnalisisFinancieroDto>();

  getDashboard(forceRefresh = false): Observable<DashboardDto> {
    const cached = this.dashboardCache();
    if (cached && !forceRefresh) {
      return of(cached);
    }
    return this.http.get<DashboardDto>(`${this.API_URL}/dashboard`).pipe(
      tap(data => this.dashboardCache.set(data))
    );
  }

  getFinanciero(meses = 12, forceRefresh = false): Observable<AnalisisFinancieroDto> {
    const cached = this.financieroCache.get(meses);
    if (cached && !forceRefresh) {
      return of(cached);
    }
    const params = new HttpParams().set('meses', meses);
    return this.http.get<AnalisisFinancieroDto>(`${this.API_URL}/financiero`, { params }).pipe(
      tap(data => this.financieroCache.set(meses, data))
    );
  }

  /** Llama esto si hacés una venta para invalidar el caché */
  invalidateCache() {
    this.dashboardCache.set(null);
    this.financieroCache.clear();
  }
}
