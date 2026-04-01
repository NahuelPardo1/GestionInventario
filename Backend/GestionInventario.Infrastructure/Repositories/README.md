# Repositories (Implementación de Persistencia) 🔌

Esta carpeta contiene la implementación real de las interfaces de repositorio definidas en el Dominio. 

## ¿Qué hacemos aquí?
Usamos **Entity Framework Core** para traducir las operaciones de C# a consultas SQL que entiende el servidor de base de datos. 

## Características Técnicas:
1. **Inyección de DbContext**: Todos los repositorios reciben el `ApplicationDbContext` por el constructor.
2. **Eager Loading**: Usamos `.Include()` para traer datos relacionados (ej: cuando pides un Libro, también traemos su Autor y Categoría).
3. **No Tracking** (Opcional): Se usa para operaciones de solo lectura para ganar velocidad.
4. **Agregaciones**: Realizamos cálculos complejos directamente en SQL (ej: `Sum`, `Count`, `GroupBy`).

## Repositorios Implementados:
- `LibroRepository`, `AutorRepository`, `CategoriaRepository`, `ClienteRepository`, `VentaRepository`, `StockRepository`, `PrestamoRepository`, `ReportesRepository`.
