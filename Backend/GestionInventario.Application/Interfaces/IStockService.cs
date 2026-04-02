using GestionInventario.Domain.Entities;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Interfaces;

public interface IStockService
{
    Task<PagedResult<StockDto>> GetAllAsync(int pageNumber = 1, int pageSize = 10);
    Task<StockDto> GetByIdAsync(int id);
    Task<PagedResult<StockDto>> GetByLibroIdAsync(int libroId, int pageNumber = 1, int pageSize = 10);
    Task<int> GetStockActualAsync(int libroId);
    Task<StockDto> CreateAsync(StockCreateDto dto);
    Task UpdateAsync(int id, StockCreateDto dto);
    Task DeleteAsync(int id);
}
