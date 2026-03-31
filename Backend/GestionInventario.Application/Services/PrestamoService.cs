using FluentValidation;
using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Domain.Exceptions;
using GestionInventario.Domain.Enums;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Services;

public class PrestamoService : IPrestamoService
{
    private readonly IPrestamoRepository _repository;
    private readonly IStockService _stockService;
    private readonly IValidator<PrestamoCreateDto> _validator;

    public PrestamoService(IPrestamoRepository repository, IStockService stockService, IValidator<PrestamoCreateDto> validator)
    {
        _repository = repository;
        _stockService = stockService;
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

        // 1. Validar que el cliente no tenga ya activamente este libro
        var hasActiveLoan = await _repository.HasActiveLoanAsync(dto.ClienteId, dto.LibroId);
        if (hasActiveLoan)
        {
            var devError = new Dictionary<string, string[]> { 
                { "LibroId", new[] { "El cliente ya tiene un ejemplar de este libro sin devolver." } } 
            };
            throw new GestionInventario.Domain.Exceptions.ValidationException(devError);
        }

        // 2. Validar que haya stock para prestar
        var stockActual = await _stockService.GetStockActualAsync(dto.LibroId);
        if (stockActual < 1)
        {
            var stockError = new Dictionary<string, string[]> { 
                { "LibroId", new[] { "No hay stock disponible para prestar este libro." } } 
            };
            throw new GestionInventario.Domain.Exceptions.ValidationException(stockError);
        }

        var prestamo = new Prestamo
        {
            LibroId = dto.LibroId,
            ClienteId = dto.ClienteId,
            FechaPrestamo = dto.FechaPrestamo,
            FechaDevolucion = dto.FechaDevolucion
        };
        await _repository.AddAsync(prestamo);

        // 3. Descontar Stock automático (Salida)
        await _stockService.CreateAsync(new StockCreateDto 
        { 
            LibroId = dto.LibroId,
            Cantidad = 1,
            Tipo = Tipo.Salida,
            Fecha = DateTime.Now
        });

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

    public async Task DevolverAsync(int id)
    {
        var prestamo = await _repository.GetByIdAsync(id);
        if (prestamo == null) throw new NotFoundException($"El préstamo con ID {id} no fue encontrado.");
        
        if (prestamo.FechaDevolucion != null)
        {
            var devError = new Dictionary<string, string[]> { 
                { "Estado", new[] { "El préstamo ya fue devuelto previamente." } } 
            };
            throw new GestionInventario.Domain.Exceptions.ValidationException(devError);
        }

        // 1. Marcar como devuelto
        prestamo.FechaDevolucion = DateTime.Now;
        await _repository.UpdateAsync(prestamo);

        // 2. Reponer el stock
        await _stockService.CreateAsync(new StockCreateDto 
        { 
            LibroId = prestamo.LibroId,
            Cantidad = 1,
            Tipo = Tipo.Entrada,
            Fecha = DateTime.Now
        });
    }

    public async Task DeleteAsync(int id)
    {
        var prestamo = await _repository.GetByIdAsync(id);
        if (prestamo == null) throw new NotFoundException($"El préstamo con ID {id} no fue encontrado.");
        
        // Si se borra un préstamo que nunca fue devuelto, reponemos ese libro al inventario para no "perderlo"
        if (prestamo.FechaDevolucion == null)
        {
            await _stockService.CreateAsync(new StockCreateDto 
            { 
                LibroId = prestamo.LibroId,
                Cantidad = 1,
                Tipo = Tipo.Entrada,
                Fecha = DateTime.Now
            });
        }

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
