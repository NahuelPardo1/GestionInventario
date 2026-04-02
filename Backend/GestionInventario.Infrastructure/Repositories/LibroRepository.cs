using Microsoft.EntityFrameworkCore;
using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;

namespace GestionInventario.Infrastructure.Repositories;

public class LibroRepository : ILibroRepository
{
    private readonly ApplicationDbContext _context;

    public LibroRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<(IEnumerable<Libro> Items, int TotalCount)> GetAllAsync(int skip, int take)
    {
        var query = _context.Libros
            .Include(l => l.Autor)
            .Include(l => l.Categoria);

        var total = await query.CountAsync();
        var items = await query.Skip(skip).Take(take).ToListAsync();
        return (items, total);
    }

    public async Task<Libro?> GetByIdAsync(int id) =>
        await _context.Libros
            .Include(l => l.Autor)
            .Include(l => l.Categoria)
            .FirstOrDefaultAsync(l => l.Id == id);

    public async Task<(IEnumerable<Libro> Items, int TotalCount)> SearchAsync(string? titulo, int? autorId, int? categoriaId, int skip, int take)
    {
        var query = _context.Libros
            .Include(l => l.Autor)
            .Include(l => l.Categoria)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(titulo))
            query = query.Where(l => l.Titulo.Contains(titulo));

        if (autorId.HasValue)
            query = query.Where(l => l.AutorId == autorId.Value);

        if (categoriaId.HasValue)
            query = query.Where(l => l.CategoriaId == categoriaId.Value);

        var total = await query.CountAsync();
        var items = await query.Skip(skip).Take(take).ToListAsync();
        return (items, total);
    }

    public async Task AddAsync(Libro libro)
    {
        await _context.Libros.AddAsync(libro);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Libro libro)
    {
        _context.Libros.Update(libro);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var libro = await GetByIdAsync(id);
        if (libro != null)
        {
            _context.Libros.Remove(libro);
            await _context.SaveChangesAsync();
        }
    }
}
