using GestionInventario.Domain.Entities;

namespace GestionInventario.Domain.Interfaces;

public interface IVentaRepository
{
    Task<IEnumerable<Venta>> GetAllAsync();
    Task<Venta?> GetByIdAsync(int id);
    Task AddAsync(Venta venta);
    Task UpdateAsync(Venta venta);
    Task DeleteAsync(int id);
}
