# Controllers (Puntos de Entrada de la API) 🌐

Esta carpeta contiene los controladores que exponen las funcionalidades del sistema al mundo exterior (navegadores, aplicaciones móviles, frontend en Angular).

## ¿Cuál es su función?
Los controladores son el "puente" entre el protocolo HTTP (Requests/Responses) y la lógica de negocio en la capa de Aplicación.

## Reglas de Oro:
1. **Thin Controllers**: No deben tener lógica de negocio. Solo reciben datos, llaman al servicio correspondiente e informan el resultado.
2. **Uso de DTOs**: Siempre deben recibir y devolver DTOs, nunca entidades de dominio directamente.
3. **Códigos de Estado**: Deben usar códigos HTTP semánticos (`200 OK`, `201 Created`, `204 NoContent`, `400 BadRequest`, `404 NotFound`).
4. **Seguridad JWT**: Todos nuestros endpoints asumen el filtro `[Authorize]` global. Para abrir un recurso sin token, se aplica explícitamente `[AllowAnonymous]`.

## Controladores Implementados:
- `AuthController`: Registro y generación de tokens JWT de sesión.
- `LibrosController`: Catálogo y búsquedas avanzadas.
- `CategoriasController`, `AutoresController`: Maestros de catálogo.
- `ClientesController`: Gestión de usuarios del sistema.
- `VentasController`: Operaciones comerciales.
- `StocksController`: Movimientos de inventario.
- `PrestamosController`: Gestión de préstamos y devoluciones.
- `ReportesController`: Análisis financiero y dashboard.
