# Middleware (Filtros de Procesamiento) 🛡️

El Middleware es una pieza de código que se mete en el medio de cada petición HTTP que llega al servidor.

## ¿Qué hacemos aquí?
En este proyecto, hemos implementado una pieza clave: el **`ExceptionMiddleware.cs`**.

## ExceptionMiddleware:
Su función es ser el **"Atrapallamas"** de todo el sistema.
- Atrapa cualquier excepción lanzada en las capas de Negocio o Dominio.
- Convierte excepciones como `ValidationException` en un limpio error HTTP 400.
- Convierte `NotFoundException` en un HTTP 404.
- En modo **Desarrollo**, nos brinda detalles técnicos del error para debuguear.
- En modo **Producción**, oculta los detalles técnicos para proteger la seguridad del sistema y devuelve un mensaje amable.

## ¿Por qué lo usamos?
Evita que tengamos que usar bloques `try-catch` en todos los controladores, garantizando un manejo de errores uniforme y profesional en toda la API.
