# Exceptions (Excepciones de Dominio) ⚠️

Este es el mecanismo centralizado para manejar errores de negocio en toda la aplicación.

## ¿Cómo funciona? 
En lugar de que cada controlador maneje sus propios errores con `try-catch`, los servicios lanzan estas excepciones específicas cuando algo sale mal.

## Nuestras Excepciones:
1. **`NotFoundException`**: Se lanza cuando un recurso no existe (ej: un libro con ID 999). El sistema lo convierte automáticamente en un HTTP 404.
2. **`ValidationException`**: Se lanza cuando fallan las reglas de FluentValidation o de integridad de negocio (ej: stock insuficiente). El sistema lo convierte en un HTTP 400.

## Integración:
Estas excepciones son atrapadas por el **`ExceptionMiddleware`** global en el proyecto WebAPI, garantizando que el usuario siempre reciba un JSON estandarizado de error.
