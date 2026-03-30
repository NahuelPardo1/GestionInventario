using FluentValidation;
using GestionInventario.Application.DTOs;
using GestionInventario.Domain.Interfaces;

namespace GestionInventario.Application.Validators;

public class ClienteCreateDtoValidator : AbstractValidator<ClienteCreateDto>
{
    private readonly IClienteRepository _clienteRepository;

    public ClienteCreateDtoValidator(IClienteRepository clienteRepository)
    {
        _clienteRepository = clienteRepository;

        RuleFor(x => x.Nombre)
            .NotEmpty().WithMessage("El nombre del cliente es obligatorio.")
            .MaximumLength(150).WithMessage("El nombre no puede superar los 150 caracteres.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("El email es obligatorio.")
            .EmailAddress().WithMessage("El formato del email no es válido.")
            .MaximumLength(150).WithMessage("El email no puede superar los 150 caracteres.")
            .MustAsync(async (email, cancellationToken) =>
                !await _clienteRepository.ExistsWithEmailAsync(email))
            .WithMessage("Ya existe un cliente registrado con ese email.");

        RuleFor(x => x.Telefono)
            .NotEmpty().WithMessage("El teléfono es obligatorio.")
            .MaximumLength(50).WithMessage("El teléfono no puede superar los 50 caracteres.");

        RuleFor(x => x.Direccion)
            .NotEmpty().WithMessage("La dirección es obligatoria.")
            .MaximumLength(255).WithMessage("La dirección no puede superar los 255 caracteres.");
    }
}
