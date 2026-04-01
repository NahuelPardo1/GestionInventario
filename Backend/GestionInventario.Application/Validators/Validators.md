# Validators (Reglas de Validación) ✅

Usamos la librería **FluentValidation** para asegurar que los datos que llegan a la API son correctos antes de entrar a la lógica del servicio.

## ¿Por qué usar FluentValidation? 
- **Separación de Concernos**: Las reglas no están dentro de las clases DTO, lo que las mantiene limpias.
- **Validaciones Complejas**: Nos permite hacer validaciones asíncronas contra la base de datos (ej: verificar si un email ya está en uso).

## Ejemplo de Uso:
```csharp
RuleFor(x => x.Email)
    .NotEmpty().WithMessage("Es obligatorio")
    .EmailAddress().WithMessage("Formato inválido");
```

## Reglas de Oro:
- Cada `CreateDto` o `UpdateDto` debería tener su validador correspondiente.
- Los mensajes deben ser amigables para el usuario final (serán mostrados en el frontend).
