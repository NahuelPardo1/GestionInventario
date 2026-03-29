using Microsoft.EntityFrameworkCore;
using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;

namespace GestionInventario.Infrastructure.Repositories;

public class CategoriaRepository : ICategoriaRepository
{
    private readonly ApplicationDbContext _context;

    public CategoriaRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Categoria>> GetAllAsync()
    {
        return await _context.Categorias.ToListAsync();
    }

    public async Task<Categoria?> GetByIdAsync(int id)
    {
        return await _context.Categorias.FindAsync(id);
    }

    public async Task AddAsync(Categoria Categoria)
    {
        await _context.Categorias.AddAsync(Categoria);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Categoria Categoria)
    {
        _context.Categorias.Update(Categoria);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var Categoria = await GetByIdAsync(id);
        if (Categoria != null)
        {
            _context.Categorias.Remove(Categoria);
            await _context.SaveChangesAsync();
        }
    }
}
