using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Services;

public class StockService : IStockService
{
    private readonly IStockRepository _repository;

    public StockService(IStockRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Stock>> GetAllAsync() =>
        await _repository.GetAllAsync();

    public async Task<Stock?> GetByIdAsync(int id) =>
        await _repository.GetByIdAsync(id);

    public async Task<IEnumerable<Stock>> GetByLibroIdAsync(int libroId) =>
        await _repository.GetByLibroIdAsync(libroId);

    public async Task<Stock> CreateAsync(StockCreateDto dto)
    {
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

    public async Task<bool> UpdateAsync(int id, StockCreateDto dto)
    {
        var stock = await _repository.GetByIdAsync(id);
        if (stock == null) return false;

        stock.LibroId = dto.LibroId;
        stock.Tipo = dto.Tipo;
        stock.Cantidad = dto.Cantidad;
        stock.Fecha = dto.Fecha;

        await _repository.UpdateAsync(stock);
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var stock = await _repository.GetByIdAsync(id);
        if (stock == null) return false;
        await _repository.DeleteAsync(id);
        return true;
    }
}
