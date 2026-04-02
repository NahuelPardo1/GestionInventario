# Capa de Aplicación (Application) ⚙️

Esta capa contiene la lógica de negocio, reglas de validación pre-procesadas, modelado de respuesta y los servicios que orquestan las operaciones. 

Depende **únicamente** de la capa de *Domain*.

## 📌 Funcionalidades

1. **Servicios (`Services`):** Intermediarios entre los Controladores (Web API) y los Repositorios. Aquí es donde habita la lógica fuerte de negocio. Ej. `VentaService.cs` valida que haya stock suficiente antes de efectuar una venta; de haberlo, la inserta en DB y ejecuta un descuento automático en `Stock`.
2. **Interfaces de Servicios (`Interfaces`):** Interfaces abstractas inyectadas a los Controladores para desacoplar el proyecto de UI de la lógica de negocio.
3. **DTOs (`DTOs`):** Objetos de Transferencia de Datos. Exponen exclusivamente las variables en bruto que la API recibe por Body (`...CreateDto`) o los que expone hacia internet (`...Dto`). Contiene también respuestas complejas como `PagedResult<TDto>`.
4. **Validaciones (`Validators`):** Reglas estrictas controladas por **FluentValidation**. Se encargan de filtrar parámetros vacíos, strings larguísimos, DNIs inválidos o variables inaceptables antes de llegar al servicio, ahorrando latencia de servidor.
5. **Mapeo (`Mappings`):** Contiene la configuración de `AutoMapper` centralizada en `MappingProfile.cs`. 

## 🛠️ ¿Cómo usar esta capa al extender el sistema?

1. Al crear una nueva Entidad, crea sus DTOs correspondientes (Ej. `ProveedorCreateDto.cs`, `ProveedorDto.cs`).
2. Agrega sus reglas de seguridad creando un inyector como `ProveedorCreateDtoValidator.cs`.
3. Crea su interfaz orquestadora `IProveedorService.cs` y su archivo lógico `ProveedorService.cs`, donde debes inyectar el Repositorio de dominio respectivo e `IMapper` para las operaciones.
4. Recuerda agregar a `MappingProfile.cs` el hilo principal de casteo de tu entidad: `CreateMap<Proveedor, ProveedorDto>();`
