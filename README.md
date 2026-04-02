# Gestión de Inventario de Libros (CRM Profesional) 📚🚀

Este proyecto es una **API REST API** robusta y escalable diseñada para gestionar el inventario, ventas, clientes y préstamos de una librería o biblioteca. Está construido siguiendo los principios de **Clean Architecture (Arquitectura Limpia)**, garantizando que el código sea testeable, mantenible y preparado para entornos de producción corporativos.

---

## 🛠️ Tecnologías y Herramientas Usadas

El sistema está desarrollado con el ecosistema de Microsoft, empleando las mejores prácticas de la industria:

- **Plataforma:** .NET 8 (C#)
- **Base de Datos:** SQL Server
- **ORM:** Entity Framework Core (Code-First)
- **Arquitectura:** Clean Architecture (Domain, Application, Infrastructure, WebAPI)
- **Validaciones:** FluentValidation (Validación de reglas de negocio asíncronas)
- **Documentación de API:** Swagger (OpenAPI)
- **Manejo de Errores:** Middleware Global de Excepciones (Centralización de respuestas HTTP 400 y 404).
- **Seguridad:** Autenticación JWT (JSON Web Tokens) y hashing de contraseñas de manera segura usando BCrypt.
- **Testing:** xUnit, Moq, y FluentAssertions para pruebas unitarias de la lógica de negocio.
- **DevOps & CI/CD:** Docker y Docker Compose para contenedorización; GitHub Actions para Integración Continua (Continuous Integration).

---

## 🏗️ Estructura del Proyecto (Clean Architecture)

El proyecto está dividido en 4 capas estrictas, asegurando el principio de Inversión de Dependencia (SOLID):

1. **`Core/GestionInventario.Domain`**: El corazón del sistema. No tiene dependencias de ningún otro proyecto. Contiene Entidades (`Libro`, `Venta`), Enums, Excepciones puras del negocio y las Interfaces de los Repositorios.
2. **`Core/GestionInventario.Application`**: La lógica de negocio. Contiene los DTOs, los Servicios (`VentaService`, `StockService`) y las reglas de validación (`FluentValidation`).
3. **`Infrastructure/GestionInventario.Infrastructure`**: Detalles técnicos. Aquí vive el `ApplicationDbContext` y la implementación real de los repositorios usando Entity Framework Core.
4. **`Presentation/GestionInventarioLibros`**: La Web API. Contiene los Controladores (Endpoints), la configuración de Inyección de Dependencias (`Program.cs`) y el Middleware.

---

## 🧠 Características Principales y Lógica de Negocio

El sistema no es un simple CRUD, cuenta con reglas de negocio activas:

- **🔍 Búsqueda Dinámica**: Búsqueda inteligente de libros mediante múltiples parámetros (Título, Autor, Categoría) usando `IQueryable` para evaluación perezosa y ahorro de recursos del servidor.
- **📊 Inteligencia de Negocio (Reportes)**: Generación de estadísticas en tiempo real (Dashboard y Análisis Financiero de ventas mensuales y top libros) ejecutando agregaciones SQL compuestas para cuidar la memoria RAM.
- **📦 Stock Inteligente**: Las ventas y los préstamos se interconectan con el módulo de `Stock`. Al vender (o prestar), el sistema valida si hay disponibilidad y genera un movimiento de `Salida` automático.
- **🛡️ Préstamos Pro**: Controles estrictos impiden que un cliente se lleve múltiples ejemplares del mismo título en paralelo. Al generar una devolución, el sistema automáticamente reintegra el stock.
- **🔄 Auto-Recuperación**: Si un usuario (Administrador) fuerza la eliminación de un préstamo o venta activos, el sistema intercepta el borrado y repone los libros al inventario de manera autónoma para prevenir inconsistencias.
- **🔐 Seguridad Avanzada (RBAC)**: Todo el sistema está fortificado mediante autenticación basada en tokens JWT. Las contraseñas de los usuarios están fuertemente encriptadas (`BCrypt.Net-Next`) y las rutas de los recursos exigen validación de Roles (`Administrador` / `Vendedor`).
- **🚀 Optimización y Rendimiento (Nivel 4)**: Implementación de **Paginación** desde la base de datos (con `Skip()` y `Take()` de EF Core) para controlar grandes flujos de datos. Uso de **AutoMapper** para transiciones veloces entre las Entidades de la Base de Datos y los `DTOs` limpios que se envían por la Web API.
- **🛡️ Alta Fiabilidad**: Cobertura exhaustiva de pruebas unitarias (`xUnit`, `Moq`) sobre la lógica central de negocio (ventas, stock, validaciones y autenticación) para prevenir regresiones.
- **🐳 DevOps y CI/CD**: Contenedorización completa con **Docker**, orquestando la Web API y SQL Server. Pipeline de **Integración Continua (CI)** con GitHub Actions que compila y ejecuta todas las pruebas automáticamente en cada "push".

---

## 🚀 Cómo hacer arrancar el proyecto localmente

Sigue estos pasos para arrancar el backend en tu entorno de desarrollo Windows:

### Requisitos previos:
- SDK de .NET 8 instalado.
- Servidor de SQL Server (LocalDB o Developer Edition) en ejecución.

### Pasos:
1. Clona o abre el proyecto en **Visual Studio** o **VS Code**.
2. Verifica la cadena de conexión en `Backend/GestionInventarioLibros/appsettings.json`. Por defecto apunta a tu instancia local: `Server=localhost;Database=GestionInventarioLibrosDb;Trusted_Connection=True;TrustServerCertificate=True;`.
3. Abre una terminal y colócate en la carpeta donde está `GestionInventarioLibros.sln`.
4. Ejecuta el siguiente comando para aplicar las migraciones y crear la base de datos:
   ```bash
   dotnet ef database update --project Backend/GestionInventario.Infrastructure --startup-project Backend/GestionInventarioLibros
   ```
5. Ejecuta la aplicación:
   ```bash
   dotnet run --project Backend/GestionInventarioLibros
   ```
6. Abre tu navegador y dirígete a la interfaz interactiva: `https://localhost:7071/swagger`.

---

## 🐳 Cómo hacer arrancar el proyecto con Docker

Si no quieres configurar SQL Server localmente, puedes levantar todo el entorno con un solo comando gracias a Docker Compose:

### Requisitos previos:
- **Docker Desktop** instalado y en ejecución.

### Pasos:
1. Abre una terminal en la raíz del proyecto (donde se encuentra `docker-compose.yml`).
2. Ejecuta el comando para construir y levantar los contenedores:
   ```bash
   docker compose up --build
   ```
3. Una vez que los contenedores estén corriendo, abre otra terminal y aplica las migraciones a la base de datos de Docker:
   ```bash
   dotnet ef database update --project Backend/GestionInventario.Infrastructure --startup-project Backend/GestionInventarioLibros
   ```
4. Navega a la API interactiva: `http://localhost:8080/swagger`.

---

## 🧪 Pruebas Unitarias (Testing)

El proyecto cuenta con un conjunto de pruebas unitarias para blindar la lógica de negocio. Para ejecutarlas localmente:

1. Abre una terminal en la raíz del proyecto.
2. Ejecuta el siguiente comando:
   ```bash
   dotnet test Backend/GestionInventarioLibros.sln
   ```
El pipeline de integración continua (CI) en GitHub Actions se asegura de que estas pruebas pasen automáticamente en cada subida de código.
