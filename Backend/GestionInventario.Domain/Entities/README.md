# Entities (Entidades de Dominio) 🏛️

Esta es la carpeta más importante del proyecto. Contiene los objetos que representan la realidad del negocio.

## ¿Qué son las Entidades?
Son representaciones directas de las tablas en la base de datos (mapeadas por EF Core). Definen las propiedades y las relaciones (navegaciones) entre los diferentes conceptos del sistema (Libros, Autores, Ventas, etc.).

## Reglas de Oro:
- **Independencia**: No deben tener ninguna referencia a capas externas (ni Servicios, ni Controladores, ni Base de Datos).
- **Propiedades de Navegación**: Se usan para representar relaciones (ej: `public Categoria? Categoria { get; set; }`).
- **Referencia Cíclica**: Se ha configurado el sistema para ignorar ciclos al serializar estas entidades en JSON.

## Nuestras Entidades:
- `Libro`, `Autor`, `Categoria`: El núcleo del catálogo.
- `Cliente`, `Venta`, `Prestamo`: El núcleo de la operación comercial.
- `Stock`: El registro de movimientos de inventario.
- `Usuario`, `RolUsuario`: Entidades responsables de la administración de Identidades y Autenticación JWT.
