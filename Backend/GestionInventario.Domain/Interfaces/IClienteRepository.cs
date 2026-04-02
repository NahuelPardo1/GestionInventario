using GestionInventario.Domain.Entities;

namespace GestionInventario.Domain.Interfaces;

public interface IClienteRepository
{
    Task<(IEnumerable<Cliente> Items, int TotalCount)> GetAllAsync(int skip, int take);
    Task<Cliente?> GetByIdAsync(int id);
    Task<bool> ExistsWithEmailAsync(string email, int? excludeId = null);
    Task AddAsync(Cliente cliente);
    Task UpdateAsync(Cliente cliente);
    Task DeleteAsync(int id);
}
