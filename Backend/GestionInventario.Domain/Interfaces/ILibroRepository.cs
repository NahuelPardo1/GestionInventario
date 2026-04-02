using GestionInventario.Domain.Entities;

namespace GestionInventario.Domain.Interfaces;

public interface ILibroRepository
{
    Task<(IEnumerable<Libro> Items, int TotalCount)> GetAllAsync(int skip, int take);
    Task<Libro?> GetByIdAsync(int id);
    Task<(IEnumerable<Libro> Items, int TotalCount)> SearchAsync(string? titulo, int? autorId, int? categoriaId, int skip, int take);
    Task AddAsync(Libro libro);
    Task UpdateAsync(Libro libro);
    Task DeleteAsync(int id);
}
