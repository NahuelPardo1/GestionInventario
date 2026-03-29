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

    public async Task<IEnumerable<Libro>> GetAllAsync()
    {
        return await _context.Libros.ToListAsync();
    }

    public async Task<Libro?> GetByIdAsync(int id)
    {
        return await _context.Libros.FindAsync(id);
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
