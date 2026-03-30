using GestionInventario.Domain.Entities;

namespace GestionInventario.Domain.Interfaces;

public interface IStockRepository
{
    Task<IEnumerable<Stock>> GetAllAsync();
    Task<Stock?> GetByIdAsync(int id);
    Task<IEnumerable<Stock>> GetByLibroIdAsync(int libroId);
    Task AddAsync(Stock stock);
    Task UpdateAsync(Stock stock);
    Task DeleteAsync(int id);
}
