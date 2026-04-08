import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'inventario',
        pathMatch: 'full'
      },
      {
        path: 'inventario',
        loadComponent: () => import('./features/libros/inventario/inventario.component').then(m => m.InventarioComponent)
      },
      {
        path: 'reportes',
        loadComponent: () => import('./features/reportes/dashboard-reportes/dashboard-reportes.component').then(m => m.DashboardReportesComponent)
      }
    ]
  }
];
