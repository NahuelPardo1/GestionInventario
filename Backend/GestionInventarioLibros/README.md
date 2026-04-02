# Capa de Presentación (Web API) 🌐

Este proyecto (`GestionInventarioLibros`) provee los canales lógicos externos. Contiene todos los Controladores (API REST Endpoints) que exponen la lógica de negocio al mundo.

## 📌 Funcionalidades

1. **Controladores (`Controllers`):** Abstracciones de protocolo HTTP. Responden las solicitudes interceptadas desde la red (GET, POST, PUT, DELETE), derivando la recolección de los datos puramente a la inyección de **Servicios** provenientes de la capa de `Application`.
2. **Configuración Inicial (`Program.cs`):** Base central del entorno de la API. Inyectar módulos en DI (AutoMapper, Repositorios, Servicios, FluentValidation, DbContext). 
3. **Middleware Global (`Middleware`):** Red de contención a fallos. Centraliza todas las excepciones del programa devolviendo códigos asertivos a la app cliente (ej. si falla un FluentValidation, en vez de crashear el servidor con Error 500, intercepta un 400 Bad Request, armando automáticamente un array con los problemas encontrados en el JSON).
4. **Protección Autenticada y Seguridad (`JwtBearer`):** Restringe peticiones no deseadas a través de validación in-built de los Tokens en `Headers: Authorization Bearer {...token}`. Todo controlador por fuera de el Endpoint de login, está configurado de manera centralizada bajo `AuthorizeFilter`.

## 🛠️ ¿Cómo usar esta capa al extender el sistema?

1. Acceder o instanciar un nuevo `[ApiController]` asegurándote referenciar en plural las rutas base `[Route("api/[controller]")]`. 
2. Inyectar exclusivamente Interfaces de **`IService`** de la Capa de `Application`. ¡Los Controladores de la Web API no deben tocar directamente ni el `DbContext` ni un `Repository`!. Así protegemos la arquitectura de dependencias de negocio fallidas.
3. Actualizar la cadena de registro del Dependency Injection dentro de `Program.cs` luego de crear un par `IEntidadRepository / IEntidadService`:
   ```csharp
   builder.Services.AddScoped<IProveedorRepository, ProveedorRepository>();
   builder.Services.AddScoped<IProveedorService, ProveedorService>();
   ```

El proyecto levantará Swagger por defecto para brindarles a los consumidores Front-End una prueba viva interactiva.
