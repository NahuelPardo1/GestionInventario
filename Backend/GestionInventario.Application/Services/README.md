# Services (Lógica de Aplicación) ⚙️

Esta es la capa donde vive la **Inteligencia del Sistema**. Aquí implementamos las reglas de negocio que orquestan los datos de los Repositorios (`Infrastructure`) y los validan (`Validators`).

## ¿Qué hacemos aquí?
1. **Validación**: Antes de crear o actualizar (usando `FluentValidation`).
2. **Orquestación**: Llamar a varios repositorios si hace falta (ej: al vender, descontar stock).
3. **Manejo de Errores**: Lanzar excepciones controladas (`ValidationException`, `NotFoundException`) que serán capturadas por el middleware.

## Flujo Sugerido:
1. Recibir DTO.
2. Validar reglas de dominio.
3. Ejecutar lógica persistente mediante Repositorios.
4. (Opcional) Guardar auditoría o logs.
5. (Auth) Administrar login, encriptado con BCrypt y tokens JWT a través de `AuthService`.
