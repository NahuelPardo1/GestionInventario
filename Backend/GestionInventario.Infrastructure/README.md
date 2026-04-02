# Capa de Infraestructura (Infrastructure) 🗄️

Esta capa concentra los pormenores técnicos del proyecto. Todo lo vinculado directamente con SQL Server, conexiones ORM, proveedores externos, o lectura local pertenece aquí.

## 📌 Funcionalidades

1. **Contexto de Base de Datos (`ApplicationDbContext.cs`):** Base neurálgica de **Entity Framework Core**. Declara todos los `DbSets` (Tablas SQL) y se encarga de crear el ecosistema de migraciones aplicando cascadas en casos como la eliminación de un autor con varios libros.
2. **Repositorios (`Repositories`):** Implementaciones reales en EF Core de las interfaces dispuestas en la capa de *Dominio*. Aquí se encuentra la sintaxis material, es decir, el lenguaje interactuando con la DB: `await _context.Libros.Skip(skip).Take(take).ToListAsync()`.

## 🛠️ Comando Clave para Migraciones

Esta capa es el punto de inicio para la base de datos de SqlServer. 
Las migraciones EF utilizan a `Infrastructure` para crear el código estructural, pero como `Infrastructure` es un proyecto de biblioteca y no un host ejecutable, las migraciones se inyectan arrancando la máquina desde `GestionInventarioLibros` (Startup Project).

```bash
# Agregar una migración nueva
dotnet ef migrations add "AgregandoTablaProveedores" --project Backend/GestionInventario.Infrastructure --startup-project Backend/GestionInventarioLibros

# Aplicar los cambios pendientes a la Base de Datos SQL:
dotnet ef database update --project Backend/GestionInventario.Infrastructure --startup-project Backend/GestionInventarioLibros
```

## 🛠️ Extender el sistema

1. En el archivo `ApplicationDbContext.cs`, enlázale tu flamante entidad con `public DbSet<Proveedor> Proveedores { get; set; }`.
2. Crea el archivo físico `ProveedorRepository.cs` en la carpeta `Repositories` heredando de la interfaz del Dominio e instrumentando los flujos CRUD sobre el contexto de la base de datos inyectado (`_context`).
