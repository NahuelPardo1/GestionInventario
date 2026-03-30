using Microsoft.EntityFrameworkCore;
using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;

namespace GestionInventario.Infrastructure.Repositories;

public class PrestamoRepository : IPrestamoRepository
{
    private readonly ApplicationDbContext _context;

    public PrestamoRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Prestamo>> GetAllAsync() =>
        await _context.Prestamos
            .Include(p => p.Libro)
            .Include(p => p.Cliente)
            .ToListAsync();

    public async Task<Prestamo?> GetByIdAsync(int id) =>
        await _context.Prestamos
            .Include(p => p.Libro)
            .Include(p => p.Cliente)
            .FirstOrDefaultAsync(p => p.Id == id);

    public async Task AddAsync(Prestamo prestamo)
    {
        await _context.Prestamos.AddAsync(prestamo);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Prestamo prestamo)
    {
        _context.Prestamos.Update(prestamo);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var prestamo = await _context.Prestamos.FindAsync(id);
        if (prestamo != null)
        {
            _context.Prestamos.Remove(prestamo);
            await _context.SaveChangesAsync();
        }
    }
}
