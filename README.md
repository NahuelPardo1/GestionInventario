# Sistema de Gestión de Inventario 📚🚀

Bienvenido al sistema integral de Gestión de Inventario, diseñado para administrar libros, clientes, ventas y préstamos de manera eficiente y escalable. Este proyecto utiliza tecnologías modernas y sigue las mejores prácticas de desarrollo como **Clean Architecture** y **DevOps**.

---

## 🏗️ Estructura del Repositorio

El proyecto está organizado en diferentes módulos:

- **[`Backend/`](./Backend/)**: Contiene la lógica del servidor (Web API), el acceso a datos y las pruebas unitarias. Desarrollado en .NET 8.
- **`.github/workflows/`**: Configuraciones de [GitHub Actions](./.github/workflows/ci.yml) para el pipeline de CI (Continuous Integration).
- **[`docker-compose.yml`](./docker-compose.yml)**: Orquestación del sistema completo para despliegue local mediante contenedores.

---

## 🚀 Cómo Iniciar el Proyecto (Docker)

La forma más rápida de poner en marcha todo el sistema (Base de Datos + API) es utilizando Docker Compose:

### Requisitos previos:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y en ejecución.

### Pasos:
1. Abre una terminal en la raíz del proyecto.
2. Ejecuta el comando para construir y levantar los contenedores:
   ```bash
   docker compose up --build
   ```
3. Una vez que los contenedores estén corriendo, aplica las migraciones a la base de datos de Docker:
   ```bash
   dotnet ef database update --project Backend/GestionInventario.Infrastructure --startup-project Backend/GestionInventarioLibros
   ```
4. Navega a la API interactiva: `http://localhost:8080/swagger`.

---

## 💻 Desarrollo y Pruebas Individuales

Si deseas trabajar únicamente en una parte del sistema o ejecutar pruebas unitarias localmente, consulta la documentación específica:

- Para detalles sobre la **Web API, Arquitectura y Testing**, consulta el [**README del Backend**](./Backend/README.md).

---

## 🛠️ Stack Tecnológico Global

- **Backend:** .NET 8, C#, EF Core, SQL Server, JWT, BCrypt.
- **Testing:** xUnit, Moq, FluentAssertions.
- **DevOps:** Docker, Docker Compose, GitHub Actions.

---

> [!TIP]
> Si deseas profundizar en la lógica de negocio (Sistemas de Ventas, Stock, Préstamos y Reportes), toda esa información se encuentra detallada en el archivo de documentación del [Backend](./Backend/README.md).
