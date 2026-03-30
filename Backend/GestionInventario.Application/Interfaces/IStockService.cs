using GestionInventario.Domain.Entities;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Interfaces;

public interface IStockService
{
    Task<IEnumerable<Stock>> GetAllAsync();
    Task<Stock?> GetByIdAsync(int id);
    Task<IEnumerable<Stock>> GetByLibroIdAsync(int libroId);
    Task<Stock> CreateAsync(StockCreateDto dto);
    Task<bool> UpdateAsync(int id, StockCreateDto dto);
    Task<bool> DeleteAsync(int id);
}
