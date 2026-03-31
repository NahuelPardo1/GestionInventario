using GestionInventario.Domain.Entities;

namespace GestionInventario.Domain.Interfaces;

public interface IPrestamoRepository
{
    Task<IEnumerable<Prestamo>> GetAllAsync();
    Task<Prestamo?> GetByIdAsync(int id);
    Task<bool> HasActiveLoanAsync(int clienteId, int libroId);
    Task AddAsync(Prestamo prestamo);
    Task UpdateAsync(Prestamo prestamo);
    Task DeleteAsync(int id);
}
