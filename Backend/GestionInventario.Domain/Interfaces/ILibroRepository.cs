using GestionInventario.Domain.Entities;

namespace GestionInventario.Domain.Interfaces;

public interface ILibroRepository
{
    Task<IEnumerable<Libro>> GetAllAsync();
    Task<Libro?> GetByIdAsync(int id);
    Task AddAsync(Libro libro);
    Task UpdateAsync(Libro libro);
    Task DeleteAsync(int id);
}
