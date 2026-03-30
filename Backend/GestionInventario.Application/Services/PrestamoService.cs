using FluentValidation;
using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Domain.Exceptions;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Services;

public class PrestamoService : IPrestamoService
{
    private readonly IPrestamoRepository _repository;
    private readonly IValidator<PrestamoCreateDto> _validator;

    public PrestamoService(IPrestamoRepository repository, IValidator<PrestamoCreateDto> validator)
    {
        _repository = repository;
        _validator = validator;
    }

    public async Task<IEnumerable<Prestamo>> GetAllAsync() =>
        await _repository.GetAllAsync();

    public async Task<Prestamo> GetByIdAsync(int id)
    {
        var prestamo = await _repository.GetByIdAsync(id);
        if (prestamo == null) throw new NotFoundException($"El préstamo con ID {id} no fue encontrado.");
        return prestamo;
    }

    public async Task<Prestamo> CreateAsync(PrestamoCreateDto dto)
    {
        await ValidarAsync(dto);
        var prestamo = new Prestamo
        {
            LibroId = dto.LibroId,
            ClienteId = dto.ClienteId,
            FechaPrestamo = dto.FechaPrestamo,
            FechaDevolucion = dto.FechaDevolucion
        };
        await _repository.AddAsync(prestamo);
        return prestamo;
    }

    public async Task UpdateAsync(int id, PrestamoCreateDto dto)
    {
        await ValidarAsync(dto);
        var prestamo = await _repository.GetByIdAsync(id);
        if (prestamo == null) throw new NotFoundException($"El préstamo con ID {id} no fue encontrado.");
        prestamo.LibroId = dto.LibroId;
        prestamo.ClienteId = dto.ClienteId;
        prestamo.FechaPrestamo = dto.FechaPrestamo;
        prestamo.FechaDevolucion = dto.FechaDevolucion;
        await _repository.UpdateAsync(prestamo);
    }

    public async Task DeleteAsync(int id)
    {
        var prestamo = await _repository.GetByIdAsync(id);
        if (prestamo == null) throw new NotFoundException($"El préstamo con ID {id} no fue encontrado.");
        await _repository.DeleteAsync(id);
    }

    private async Task ValidarAsync(PrestamoCreateDto dto)
    {
        var result = await _validator.ValidateAsync(dto);
        if (!result.IsValid)
        {
            var errors = result.Errors
                .GroupBy(e => e.PropertyName)
                .ToDictionary(g => g.Key, g => g.Select(x => x.ErrorMessage).ToArray());
            throw new GestionInventario.Domain.Exceptions.ValidationException(errors);
        }
    }
}
