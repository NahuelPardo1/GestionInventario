# Capa de Dominio (Domain) 🧠

Esta es la capa más profunda e importante del sistema, siguiendo los principios de la **Clean Architecture**. Representa el corazón del software.

## 📌 Funcionalidades

En esta capa no encontrarás dependencias a frameworks externos, bases de datos o servicios web. Es puro C# (.NET).

Contiene:
1. **Entidades del Negocio (`Entities`):** Clases puras (`Libro`, `Venta`, `Prestamo`, `Stock`, `Cliente`, `Autor`, `Categoria`, `Usuario`, `Roles`) que representan el modelo conceptual y mapean hacia las tablas principales.
2. **Interfaces de Repositorios (`Interfaces`):** Contratos (ej. `ILibroRepository`, `IVentaRepository`) que definen cómo se deben leer o guardar los datos. La capa de infraestructura será la responsable de darles implementación tecnológica.
3. **Excepciones de Dominio (`Exceptions`):** Reglas estrictas de errores de la empresa, evitando lanzar excepciones genéricas. Por ejemplo, `NotFoundException` se lanza al no encontrar un registro, separando el ruido de excepciones técnicas (ej. fallas de servidor).
4. **Enums (`Enums`):** Parámetros fijos de negocio, como el estado de rol interno, o si un stock es de `Entrada` o `Salida`.

## 🛠️ ¿Cómo usar esta capa al extender el sistema?

Si debes agregar una **nueva entidad al sistema** (ejemplo, `Proveedor`), los pasos son:
1. Crear la Entidad `Proveedor.cs` en la carpeta `/Entities` con sus respectivas propiedades y relaciones de clave foránea.
2. Crear su respectiva interfaz `IProveedorRepository` en la carpeta `/Interfaces` detallando sus operaciones (ej: `GetAllAsync`, `GetByIdAsync`, etc.). En caso de ser una lista larga, recuerda hacer uso de tuplas para la paginación: `Task<(IEnumerable<Proveedor> Items, int TotalCount)> GetAllAsync(int skip, int take);`

Cualquier proyecto dentro de esta solución puede referenciar al `Domain`, pero **el `Domain` no puede referenciar a nadie.**
