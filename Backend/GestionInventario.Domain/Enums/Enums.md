# Enums (Enumeraciones de Negocio) 🏷️

Contiene las opciones fijas o tipos de datos que utiliza el sistema.

## ¿Por qué las usamos? 
Para evitar trabajar con enteros ("magic numbers") que no significan nada (como `0`, `1`, `2`) y reemplazarlos por palabras claras.

## Enums Actuales:
- **`Tipo`**: Define si un movimiento de stock es una **Entrada** (compra o devolución) o una **Salida** (venta o préstamo).
- **`Rol`** (Futuro): Para definir roles de usuario (Admin, Vendedor).

## Reglas de Oro:
- Deben representar estados finitos del negocio.
- Se almacenan como enteros en la base de datos por eficiencia.
