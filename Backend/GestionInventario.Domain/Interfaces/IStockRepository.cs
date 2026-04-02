using GestionInventario.Domain.Entities;

namespace GestionInventario.Domain.Interfaces;

public interface IStockRepository
{
    Task<(IEnumerable<Stock> Items, int TotalCount)> GetAllAsync(int skip, int take);
    Task<Stock?> GetByIdAsync(int id);
    Task<(IEnumerable<Stock> Items, int TotalCount)> GetByLibroIdAsync(int libroId, int skip, int take);
    Task<int> GetStockActualAsync(int libroId);
    Task AddAsync(Stock stock);
    Task UpdateAsync(Stock stock);
    Task DeleteAsync(int id);
}
