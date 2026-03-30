using FluentValidation;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Validators;

public class AutorCreateDtoValidator : AbstractValidator<AutorCreateDto>
{
    public AutorCreateDtoValidator()
    {
        RuleFor(x => x.Nombre)
            .NotEmpty().WithMessage("El nombre del autor es obligatorio.")
            .MaximumLength(150).WithMessage("El nombre no puede superar los 150 caracteres.");

        RuleFor(x => x.Nacionalidad)
            .NotEmpty().WithMessage("La nacionalidad es obligatoria.")
            .MaximumLength(100).WithMessage("La nacionalidad no puede superar los 100 caracteres.");

        RuleFor(x => x.FechaNacimiento)
            .NotEmpty().WithMessage("La fecha de nacimiento es obligatoria.")
            .LessThan(DateTime.Today).WithMessage("La fecha de nacimiento debe ser anterior a hoy.");

        RuleFor(x => x.Biografia)
            .MaximumLength(2000).WithMessage("La biografía no puede superar los 2000 caracteres.");
    }
}
