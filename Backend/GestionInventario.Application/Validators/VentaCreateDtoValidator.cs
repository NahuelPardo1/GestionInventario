using FluentValidation;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Validators;

public class VentaCreateDtoValidator : AbstractValidator<VentaCreateDto>
{
    public VentaCreateDtoValidator()
    {
        RuleFor(x => x.LibroId)
            .GreaterThan(0).WithMessage("Debe seleccionar un libro válido.");

        RuleFor(x => x.ClienteId)
            .GreaterThan(0).WithMessage("Debe seleccionar un cliente válido.");

        RuleFor(x => x.FechaVenta)
            .NotEmpty().WithMessage("La fecha de venta es obligatoria.")
            .LessThanOrEqualTo(DateTime.Now).WithMessage("La fecha de venta no puede ser en el futuro.");

        RuleFor(x => x.Cantidad)
            .GreaterThan(0).WithMessage("La cantidad debe ser mayor a 0.");

        RuleFor(x => x.Total)
            .GreaterThan(0).WithMessage("El total de la venta debe ser mayor a 0.");
    }
}
