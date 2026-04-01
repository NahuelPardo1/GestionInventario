# Interfaces (Repositores de Datos) 💾

Aquí se definen los contratos para el acceso a datos. Siguiendo el principio de **Clean Architecture**, el Dominio no sabe *cómo* se guardan los datos, solo *qué* operaciones se pueden hacer.

## ¿Qué son estas Interfaces?
Son los planos (blueprints) de los Repositorios. La implementación real ocurre en la capa de **Infrastructure** usando Entity Framework.

## Operaciones Estándar:
- `GetAllAsync()`: Obtiene todos los registros con sus relaciones.
- `GetByIdAsync(int id)`: Obtiene un solo registro.
- `AddAsync(T entity)`: Prepara el guardado de un objeto.
- `UpdateAsync(T entity)`: Prepara la modificación.
- `DeleteAsync(int id)`: Elimina el registro por ID.

## Métodos Especializados:
- `LibroRepository`: Búsquedas dinámicas.
- `StockRepository`: Cálculo de stock neto (Suma de Entradas - Suma de Salidas).
- `ReportesRepository`: Estadísticas financieras complejas.
