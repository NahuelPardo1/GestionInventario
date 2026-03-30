using FluentValidation;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Validators;

public class StockCreateDtoValidator : AbstractValidator<StockCreateDto>
{
    public StockCreateDtoValidator()
    {
        RuleFor(x => x.LibroId)
            .GreaterThan(0).WithMessage("Debe seleccionar un libro válido.");

        RuleFor(x => x.Tipo)
            .IsInEnum().WithMessage("El tipo de movimiento no es válido. Use 0 (Entrada) o 1 (Salida).");

        RuleFor(x => x.Cantidad)
            .GreaterThan(0).WithMessage("La cantidad no puede ser negativa ni cero. Debe ser mayor a 0.");

        RuleFor(x => x.Fecha)
            .NotEmpty().WithMessage("La fecha del movimiento es obligatoria.")
            .LessThanOrEqualTo(DateTime.Now).WithMessage("La fecha del movimiento no puede ser en el futuro.");
    }
}
