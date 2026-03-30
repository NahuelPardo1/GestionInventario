using FluentValidation;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Validators;

public class LibroCreateDtoValidator : AbstractValidator<LibroCreateDto>
{
    public LibroCreateDtoValidator()
    {
        RuleFor(x => x.Titulo)
            .NotEmpty().WithMessage("El título es obligatorio.")
            .MaximumLength(200).WithMessage("El título no puede superar los 200 caracteres.");

        RuleFor(x => x.AutorId)
            .GreaterThan(0).WithMessage("Debe seleccionar un autor válido.");

        RuleFor(x => x.Precio)
            .GreaterThan(0).WithMessage("El precio debe ser mayor a 0.");

        RuleFor(x => x.CategoriaId)
            .NotNull().WithMessage("Debe seleccionar una categoría.")
            .GreaterThan(0).WithMessage("La categoría seleccionada no es válida.");
    }
}
