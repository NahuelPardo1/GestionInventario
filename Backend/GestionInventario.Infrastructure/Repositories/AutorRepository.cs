using Microsoft.EntityFrameworkCore;
using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;

namespace GestionInventario.Infrastructure.Repositories;

public class AutorRepository : IAutorRepository
{
    private readonly ApplicationDbContext _context;

    public AutorRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Autor>> GetAllAsync() =>
        await _context.Autores.ToListAsync();

    public async Task<Autor?> GetByIdAsync(int id) =>
        await _context.Autores.FindAsync(id);

    public async Task AddAsync(Autor autor)
    {
        await _context.Autores.AddAsync(autor);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Autor autor)
    {
        _context.Autores.Update(autor);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var autor = await GetByIdAsync(id);
        if (autor != null)
        {
            _context.Autores.Remove(autor);
            await _context.SaveChangesAsync();
        }
    }
}
