# DTOs (Data Transfer Objects) 📦

Esta carpeta contiene los objetos utilizados para transferir datos entre la API (Capa de Presentación) y los Servicios (Capa de Aplicación).

## ¿Para qué sirven?
Los DTOs nos permiten desacoplar nuestra base de datos (Entidades de Dominio) de lo que mostramos al usuario o recibimos del cliente.

## Tipos de DTOs en este módulo:
1. **Create/Update Dto**: Clientes envían estos datos para crear o modificar registros (ej: `LibroCreateDto`).
2. **Result Dto**: Datos formateados que devolvemos al frontend (ej: `DashboardDto`).
3. **Report Dto**: Estructuras especializadas para gráficos y analíticas.

## Reglas de Oro:
- Nunca deben contener lógica de negocio.
- Solo deben tener propiedades simples (strings, ints, datetimes).
- Se validan mediante **FluentValidation** en la carpeta `Validators`.
