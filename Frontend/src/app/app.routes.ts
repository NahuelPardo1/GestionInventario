import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'inventario', pathMatch: 'full' },
      { path: 'inventario', loadComponent: () => import('./features/libros/inventario/inventario.component').then(m => m.InventarioComponent) },
      { path: 'reportes', loadComponent: () => import('./features/reportes/dashboard-reportes/dashboard-reportes.component').then(m => m.DashboardReportesComponent) },
      { path: 'autores', loadComponent: () => import('./features/autores/autores.component').then(m => m.AutoresComponent) },
      { path: 'categorias', loadComponent: () => import('./features/categorias/categorias.component').then(m => m.CategoriasComponent) },
      { path: 'clientes', loadComponent: () => import('./features/clientes/clientes.component').then(m => m.ClientesComponent) },
      { path: 'ventas', loadComponent: () => import('./features/ventas/ventas.component').then(m => m.VentasComponent) },
      { path: 'prestamos', loadComponent: () => import('./features/prestamos/prestamos.component').then(m => m.PrestamosComponent) },
      { path: 'stocks', loadComponent: () => import('./features/stocks/stocks.component').then(m => m.StocksComponent) },
    ]
  }
];
