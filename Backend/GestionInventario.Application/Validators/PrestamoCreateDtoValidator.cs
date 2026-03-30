using FluentValidation;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Validators;

public class PrestamoCreateDtoValidator : AbstractValidator<PrestamoCreateDto>
{
    public PrestamoCreateDtoValidator()
    {
        RuleFor(x => x.LibroId)
            .GreaterThan(0).WithMessage("Debe seleccionar un libro válido.");

        RuleFor(x => x.ClienteId)
            .GreaterThan(0).WithMessage("Debe seleccionar un cliente válido.");

        RuleFor(x => x.FechaPrestamo)
            .NotEmpty().WithMessage("La fecha de préstamo es obligatoria.");

        RuleFor(x => x.FechaDevolucion)
            .GreaterThan(x => x.FechaPrestamo)
            .WithMessage("La fecha de devolución debe ser posterior a la fecha de préstamo.")
            .When(x => x.FechaDevolucion.HasValue);
    }
}
