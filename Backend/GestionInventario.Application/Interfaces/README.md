# Interfaces (Contratos de Servicio) 📜

Aquí se definen las interfaces de todos los servicios del proyecto. 

## ¿Por qué las usamos? 
Siguiendo los principios de **DIP (Inversión de Dependencia) de SOLID**, nuestros controladores no hablan directamente con las clases de servicio (ej: `VentaService.cs`), sino con sus interfaces (`IVentaService.cs`). 

Esto nos permite:
1. **Mocking**: Hacer pruebas unitarias fácilmente reemplazando el servicio real por uno de prueba.
2. **Desacoplamiento**: Cambiar el funcionamiento interno de un servicio sin afectar al controlador.

## Estructura Actual:
- **I[Entidad]Service**: Contiene los métodos de CRUD y lógica de negocio para una entidad.
- **IReportesService**: Interfaz especializada en la orquestación de datos agregados.
