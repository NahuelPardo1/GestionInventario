using FluentValidation;
using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Domain.Exceptions;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;
using GestionInventario.Domain.Enums;

namespace GestionInventario.Application.Services;

public class VentaService : IVentaService
{
    private readonly IVentaRepository _repository;
    private readonly IStockService _stockService;
    private readonly IValidator<VentaCreateDto> _validator;

    public VentaService(IVentaRepository repository, IStockService stockService, IValidator<VentaCreateDto> validator)
    {
        _repository = repository;
        _stockService = stockService;
        _validator = validator;
    }

    public async Task<IEnumerable<Venta>> GetAllAsync() =>
        await _repository.GetAllAsync();

    public async Task<Venta> GetByIdAsync(int id)
    {
        var venta = await _repository.GetByIdAsync(id);
        if (venta == null) throw new NotFoundException($"La venta con ID {id} no fue encontrada.");
        return venta;
    }

    public async Task<Venta> CreateAsync(VentaCreateDto dto)
    {
        await ValidarAsync(dto);

        // 1. Validar Stock
        var stockActual = await _stockService.GetStockActualAsync(dto.LibroId);
        if (stockActual < dto.Cantidad)
        {
            var errors = new Dictionary<string, string[]> { 
                { "Cantidad", new[] { $"Stock insuficiente. Solo quedan {stockActual} unidades." } } 
            };
            throw new GestionInventario.Domain.Exceptions.ValidationException(errors);
        }

        var venta = new Venta
        {
            LibroId = dto.LibroId,
            ClienteId = dto.ClienteId,
            FechaVenta = dto.FechaVenta,
            Cantidad = dto.Cantidad,
            Total = dto.Total
        };

        // 2. Guardar Venta
        await _repository.AddAsync(venta);

        // 3. Descontar Stock automático
        await _stockService.CreateAsync(new StockCreateDto 
        { 
            LibroId = dto.LibroId,
            Cantidad = dto.Cantidad,
            Tipo = Tipo.Salida,
            Fecha = DateTime.Now
        });

        return venta;
    }

    public async Task UpdateAsync(int id, VentaCreateDto dto)
    {
        await ValidarAsync(dto);
        var venta = await _repository.GetByIdAsync(id);
        if (venta == null) throw new NotFoundException($"La venta con ID {id} no fue encontrada.");
        venta.LibroId = dto.LibroId;
        venta.ClienteId = dto.ClienteId;
        venta.FechaVenta = dto.FechaVenta;
        venta.Cantidad = dto.Cantidad;
        venta.Total = dto.Total;
        await _repository.UpdateAsync(venta);
    }

    public async Task DeleteAsync(int id)
    {
        var venta = await _repository.GetByIdAsync(id);
        if (venta == null) throw new NotFoundException($"La venta con ID {id} no fue encontrada.");
        
        // 1. Devolver Stock automático
        await _stockService.CreateAsync(new StockCreateDto 
        { 
            LibroId = venta.LibroId,
            Cantidad = venta.Cantidad,
            Tipo = Tipo.Entrada,
            Fecha = DateTime.Now
        });

        // 2. Borrar Venta
        await _repository.DeleteAsync(id);
    }

    private async Task ValidarAsync(VentaCreateDto dto)
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
