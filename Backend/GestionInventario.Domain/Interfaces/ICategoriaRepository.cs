using GestionInventario.Domain.Entities;

namespace GestionInventario.Domain.Interfaces;

public interface ICategoriaRepository
{
    Task<IEnumerable<Categoria>> GetAllAsync();
    Task<Categoria?> GetByIdAsync(int id);
    Task AddAsync(Categoria Categoria);
    Task UpdateAsync(Categoria Categoria);
    Task DeleteAsync(int id);
}
