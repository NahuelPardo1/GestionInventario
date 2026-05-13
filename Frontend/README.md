# Frontend — Gestión de Inventario de Libros 📚

SPA (Single Page Application) desarrollada en **Angular 19** con un tema visual oscuro personalizado (dark mode). Consume la API REST del Backend para gestionar todas las entidades del sistema.

---

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Levantar servidor de desarrollo (requiere Backend corriendo en :8081)
npm run start
```

Acceder en: `http://localhost:4200`

> [!IMPORTANT]
> El Backend y la base de datos deben estar corriendo antes de levantar el frontend.
> Ver instrucciones en el [README raíz](../README.md).

---

## 📁 Estructura del Proyecto

```
Frontend/
├── proxy.conf.json             → Redirige /api → http://localhost:8081
├── src/
│   └── app/
│       ├── app.ts              → Componente raíz
│       ├── app.config.ts       → Configuración global (providers, interceptors)
│       ├── app.routes.ts       → Definición de rutas con lazy loading
│       │
│       ├── core/               → Lógica transversal (no depende de features)
│       │   ├── guards/         → Protección de rutas
│       │   ├── interceptors/   → Modificación automática de requests HTTP
│       │   ├── models/         → Interfaces TypeScript (DTOs)
│       │   └── services/       → Comunicación con la API + caché
│       │
│       ├── features/           → Páginas de la aplicación (una por entidad)
│       │   ├── auth/login/     → Pantalla de inicio de sesión
│       │   ├── libros/         → Inventario de libros (tabla + formulario)
│       │   ├── autores/        → CRUD de autores
│       │   ├── categorias/     → CRUD de categorías (vista de tarjetas)
│       │   ├── clientes/       → CRUD de clientes
│       │   ├── ventas/         → Registro y gestión de ventas
│       │   ├── prestamos/      → Gestión de préstamos y devoluciones
│       │   ├── stocks/         → Historial de movimientos de stock
│       │   └── reportes/       → Dashboard financiero
│       │
│       └── layout/             → Estructura visual del dashboard
│           ├── main-layout/    → Contenedor principal (sidebar + router-outlet)
│           ├── sidebar/        → Menú de navegación lateral
│           └── navbar/         → Barra superior
```

---

## 🔐 Autenticación y Seguridad

### Flujo de Login
1. El usuario ingresa credenciales en `/login`
2. `AuthService.login()` llama a `POST /api/Auth/login`
3. El backend devuelve un **JWT token**
4. El token se guarda en `localStorage` (`token` y `user`)
5. El `authGuard` protege todas las rutas bajo `/dashboard`

### Archivos clave

| Archivo | Responsabilidad |
|---|---|
| `core/services/AuthService.ts` | Login, logout, verificar sesión, persistir token |
| `core/guards/auth.guard.ts` | Redirige a `/login` si no hay token |
| `core/interceptors/auth.interceptor.ts` | Inyecta `Authorization: Bearer <token>` en cada request |

> [!NOTE]
> **Protección contra SQL Injection:** El backend usa Entity Framework Core con
> consultas parametrizadas. No hay concatenación de strings SQL en ningún punto.
> El frontend solo envía datos via JSON, nunca construye queries.

---

## ⚡ Caché en Memoria

Para evitar recargas innecesarias al navegar entre secciones, todos los servicios
implementan caché con **Angular Signals**:

```typescript
// Patrón usado en todos los servicios
private cache = signal<T | null>(null);

getAll(): Observable<T> {
  if (this.cache()) return of(this.cache()!);   // ← Retorna caché al instante
  return this.http.get<T>(URL).pipe(
    tap(data => this.cache.set(data))            // ← Guarda en caché
  );
}

create(dto): Observable<T> {
  return this.http.post<T>(URL, dto).pipe(
    tap(() => this.cache.set(null))              // ← Invalida caché al escribir
  );
}
```

| Servicio | Caché | Se invalida cuando |
|---|---|---|
| `LibroService` | Por página | Crear / Editar / Eliminar libro |
| `AutorService` | Lista completa | Crear / Editar / Eliminar autor |
| `CategoriaService` | Lista completa | Crear / Editar / Eliminar categoría |
| `ClienteService` | Por página | Crear / Editar / Eliminar cliente |
| `VentaService` | Por página | Crear / Eliminar venta |
| `PrestamoService` | Por página | Crear / Devolver / Eliminar préstamo |
| `StockService` | Por página | Crear / Eliminar movimiento |
| `ReportesService` | Métricas y financiero | Venta creada / eliminada |

---

## 🗺️ Rutas

Todas las rutas del dashboard requieren autenticación (`authGuard`).
Los componentes se cargan de forma **lazy** (solo cuando se navega a esa ruta).

| URL | Componente | Descripción |
|---|---|---|
| `/login` | `LoginComponent` | Autenticación |
| `/dashboard` | `MainLayoutComponent` | Redirige a `/dashboard/inventario` |
| `/dashboard/inventario` | `InventarioComponent` | Lista de libros con búsqueda y paginación |
| `/dashboard/autores` | `AutoresComponent` | CRUD de autores |
| `/dashboard/categorias` | `CategoriasComponent` | CRUD de categorías (tarjetas) |
| `/dashboard/clientes` | `ClientesComponent` | CRUD de clientes paginado |
| `/dashboard/ventas` | `VentasComponent` | Registro de ventas (descuenta stock automáticamente) |
| `/dashboard/prestamos` | `PrestamosComponent` | Préstamos con acción "Devolver" |
| `/dashboard/stocks` | `StocksComponent` | Historial de entradas/salidas de stock |
| `/dashboard/reportes` | `DashboardReportesComponent` | KPIs y métricas financieras |

---

## 📦 Modelos (Interfaces TypeScript)

### `core/models/libro.interfaces.ts`
```typescript
LibroDto           // Datos de un libro (id, titulo, autorId, precio, ...)
LibroCreateDto     // Payload para crear/editar un libro
AutorDto           // Datos de un autor
AutorCreateDto     // Payload para crear/editar un autor
CategoriaDto       // Datos de una categoría
CategoriaCreateDto
PagedResult<T>     // Wrapper de paginación { items, totalCount, totalPages, ... }
```

### `core/models/venta.interfaces.ts`
```typescript
VentaDto / VentaCreateDto
ClienteDto / ClienteCreateDto
PrestamoDto / PrestamoCreateDto
StockDto / StockCreateDto      // tipo: 0=Entrada, 1=Salida
```

### `core/models/reportes.interfaces.ts`
```typescript
DashboardDto          // KPIs generales (total libros, ventas, ingresos, ...)
ReporteFinancieroDto  // Datos mensuales de ingresos y ventas
```

### `core/models/auth.interfaces.ts`
```typescript
LoginRequest    // { email, password }
AuthResponse    // { token, nombreUsuario, email }
```

---

## 🧩 Servicios

| Servicio | Archivo | Endpoints que consume |
|---|---|---|
| `AuthService` | `AuthService.ts` | `POST /api/Auth/login`, `/register` |
| `LibroService` | `libro.service.ts` | `GET/POST/PUT/DELETE /api/Libros` |
| `AutorService` | `catalogo.service.ts` | `GET/POST/PUT/DELETE /api/Autores` |
| `CategoriaService` | `catalogo.service.ts` | `GET/POST/PUT/DELETE /api/Categorias` |
| `ClienteService` | `cliente.service.ts` | `GET/POST/PUT/DELETE /api/Clientes` |
| `VentaService` | `venta.service.ts` | `GET/POST/PUT/DELETE /api/Ventas` |
| `PrestamoService` | `prestamo.service.ts` | `GET/POST/DELETE /api/Prestamos`, `PUT /api/Prestamos/{id}/devolver` |
| `StockService` | `stock.service.ts` | `GET/POST/DELETE /api/Stocks` |
| `ReportesService` | `reportes.service.ts` | `GET /api/Reportes/dashboard`, `/financiero` |

---

## 🎨 Diseño y Estilos

El tema visual es un **dark mode** con glassmorphism, definido en `src/styles.css`.

Clases CSS globales disponibles en cualquier componente:

| Clase | Uso |
|---|---|
| `.glass-panel` | Panel con fondo translúcido y blur |
| `.btn-primary` | Botón principal (color acento) |
| `.btn-secondary` | Botón secundario (outline) |
| `.btn-icon` | Botón icono cuadrado pequeño |
| `.btn-icon.danger` | Botón icono rojo (eliminar) |
| `.input-premium` | Input con estilos dark premium |
| `.animate-fade-in` | Animación de entrada suave |

---

## ⚙️ Configuración

### `proxy.conf.json`
```json
{
  "/api": {
    "target": "http://localhost:8081",
    "secure": false,
    "changeOrigin": true
  }
}
```
Redirige todas las llamadas a `/api/*` al backend. En producción esto lo maneja un reverse proxy (Nginx, etc.).

### `tsconfig.json`
- `strict: true` — Tipado estricto activado
- `useUnknownInCatchVariables: false` — Permite tipar callbacks de error como `any`
- `target: ES2022` — JavaScript moderno

---

## 🔄 Patrón de Componentes

Todos los componentes de features siguen el mismo patrón:

```typescript
@Component({ standalone: true, imports: [CommonModule, FormsModule], template: `...` })
export class MiEntidadComponent implements OnInit {
  // 1. Inyección de servicios
  private service = inject(MiEntidadService);

  // 2. Estado del componente
  items: ItemDto[] = [];
  loading = true;
  showModal = false;
  saving = false;
  form: ItemCreateDto = { ... };

  // 3. Ciclo de vida
  ngOnInit() { this.load(); }

  // 4. Métodos CRUD
  load() { /* llama al servicio, actualiza loading */ }
  openAdd() { /* inicializa form vacío, abre modal */ }
  openEdit(item) { /* carga datos en form, abre modal */ }
  save() { /* create o update según isEdit */ }
  delete(item) { /* confirm + delete */ }

  // 5. Notificaciones
  notify(message, type) { /* toast temporal 4s */ }
}
```

---

## 🛠️ Comandos Útiles

```bash
# Servidor de desarrollo
npm run start

# Build de producción
npm run build

# Verificar errores de TypeScript sin compilar
npx tsc --noEmit
```
