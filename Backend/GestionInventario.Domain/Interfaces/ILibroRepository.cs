using GestionInventario.Domain.Entities;

namespace GestionInventario.Domain.Interfaces;

public interface ILibroRepository
{
    Task<IEnumerable<Libro>> GetAllAsync();
    Task<Libro?> GetByIdAsync(int id);
    Task<IEnumerable<Libro>> SearchAsync(string? titulo, int? autorId, int? categoriaId);
    Task AddAsync(Libro libro);
    Task UpdateAsync(Libro libro);
    Task DeleteAsync(int id);
}
