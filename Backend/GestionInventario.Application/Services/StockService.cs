using FluentValidation;
using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Domain.Exceptions;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Services;

public class StockService : IStockService
{
    private readonly IStockRepository _repository;
    private readonly IValidator<StockCreateDto> _validator;

    public StockService(IStockRepository repository, IValidator<StockCreateDto> validator)
    {
        _repository = repository;
        _validator = validator;
    }

    public async Task<IEnumerable<Stock>> GetAllAsync() =>
        await _repository.GetAllAsync();

    public async Task<Stock> GetByIdAsync(int id)
    {
        var stock = await _repository.GetByIdAsync(id);
        if (stock == null) throw new NotFoundException($"El movimiento de stock con ID {id} no fue encontrado.");
        return stock;
    }

    public async Task<IEnumerable<Stock>> GetByLibroIdAsync(int libroId) =>
        await _repository.GetByLibroIdAsync(libroId);

    public async Task<Stock> CreateAsync(StockCreateDto dto)
    {
        await ValidarAsync(dto);
        var stock = new Stock
        {
            LibroId = dto.LibroId,
            Tipo = dto.Tipo,
            Cantidad = dto.Cantidad,
            Fecha = dto.Fecha
        };
        await _repository.AddAsync(stock);
        return stock;
    }

    public async Task UpdateAsync(int id, StockCreateDto dto)
    {
        await ValidarAsync(dto);
        var stock = await _repository.GetByIdAsync(id);
        if (stock == null) throw new NotFoundException($"El movimiento de stock con ID {id} no fue encontrado.");
        stock.LibroId = dto.LibroId;
        stock.Tipo = dto.Tipo;
        stock.Cantidad = dto.Cantidad;
        stock.Fecha = dto.Fecha;
        await _repository.UpdateAsync(stock);
    }

    public async Task DeleteAsync(int id)
    {
        var stock = await _repository.GetByIdAsync(id);
        if (stock == null) throw new NotFoundException($"El movimiento de stock con ID {id} no fue encontrado.");
        await _repository.DeleteAsync(id);
    }

    private async Task ValidarAsync(StockCreateDto dto)
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
