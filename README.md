# Sistema de Gestión de Inventario de Libros 📚

Sistema completo de gestión para una librería: inventario, ventas, préstamos, clientes, reportes financieros y control de stock. Desarrollado con **Clean Architecture** en el backend y **Angular 19** en el frontend.

---

## 🏗️ Estructura del Repositorio

```
GestionInventarioLibros/
├── Backend/                  → API REST en .NET 8 (Clean Architecture)
│   ├── GestionInventarioLibros/       → Proyecto principal (Web API)
│   ├── GestionInventario.Application/ → Casos de uso y DTOs
│   ├── GestionInventario.Domain/      → Entidades y contratos
│   └── GestionInventario.Infrastructure/ → EF Core, Repositorios
├── Frontend/                 → SPA en Angular 19
│   └── src/app/
│       ├── core/             → Servicios, modelos, guards, interceptors
│       ├── features/         → Páginas por entidad (CRUD)
│       └── layout/           → Sidebar, Navbar, Layout principal
├── docker-compose.yml        → Orquesta SQL Server + API en Docker
└── README.md                 → Este archivo
```

---

## 🚀 Inicio Rápido (Stack Completo)

### Requisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) corriendo
- [Node.js 20+](https://nodejs.org/) y npm
- [.NET 8 SDK](https://dotnet.microsoft.com/) (solo para migraciones)

### 1. Levantar Base de Datos + API con Docker

```bash
# Desde la raíz del proyecto
docker compose up --build
```

Esto levanta:
- **SQL Server** en `localhost:1433`
- **API REST** en `http://localhost:8081`
- **Swagger UI** en `http://localhost:8081/swagger`

### 2. Aplicar Migraciones (primera vez)

```bash
cd Backend
dotnet ef database update --project GestionInventario.Infrastructure --startup-project GestionInventarioLibros --connection "Server=localhost,1433;Database=GestionInventarioLibrosDb;User Id=sa;Password=YourStrongPassword123!;TrustServerCertificate=True;"
```

### 3. Crear usuario inicial

Accedé a Swagger en `http://localhost:8081/swagger` y ejecutá:

```
POST /api/Auth/register
{
  "nombreUsuario": "admin",
  "email": "admin@test.com",
  "password": "Admin123!"
}
```

### 4. Levantar el Frontend

```bash
cd Frontend
npm install
npm run start
```

Frontend disponible en: **`http://localhost:4200`**

---

## 🔗 Comunicación entre capas

```
[Angular :4200] → proxy /api → [API :8081] → [SQL Server :1433]
```

El proxy está configurado en `Frontend/proxy.conf.json` para redirigir
todas las llamadas a `/api/*` al backend en `http://localhost:8081`.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
|------|-------------|
| **Frontend** | Angular 19, TypeScript, CSS (custom dark theme) |
| **Backend** | .NET 8, C#, ASP.NET Core, EF Core 8 |
| **Base de Datos** | SQL Server 2022 |
| **Seguridad** | JWT Bearer, BCrypt, EF parameterized queries |
| **DevOps** | Docker, Docker Compose, GitHub Actions |
| **Testing** | xUnit, Moq, FluentAssertions |

---

## 📖 Documentación Detallada

- [**README del Backend**](./Backend/README.md) — Arquitectura, endpoints, lógica de negocio
- [**README del Frontend**](./Frontend/README.md) — Estructura Angular, servicios, rutas

---

## 🔌 Conexión a la Base de Datos (SSMS)

Para inspecionar las tablas con SQL Server Management Studio:

| Campo | Valor |
|---|---|
| Server | `localhost,1433` |
| Authentication | SQL Server Authentication |
| Login | `sa` |
| Password | `YourStrongPassword123!` |
| Trust Certificate | ✅ Marcar |

> [!TIP]
> La contraseña es la definida en `docker-compose.yml` bajo `MSSQL_SA_PASSWORD`.
