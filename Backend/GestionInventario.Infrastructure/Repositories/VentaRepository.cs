using Microsoft.EntityFrameworkCore;
using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;

namespace GestionInventario.Infrastructure.Repositories;

public class VentaRepository : IVentaRepository
{
    private readonly ApplicationDbContext _context;

    public VentaRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<(IEnumerable<Venta> Items, int TotalCount)> GetAllAsync(int skip, int take)
    {
        var query = _context.Ventas
            .Include(v => v.Libro)
            .Include(v => v.Cliente);

        var total = await query.CountAsync();
        var items = await query.Skip(skip).Take(take).ToListAsync();
        return (items, total);
    }

    public async Task<Venta?> GetByIdAsync(int id) =>
        await _context.Ventas
            .Include(v => v.Libro)
            .Include(v => v.Cliente)
            .FirstOrDefaultAsync(v => v.Id == id);

    public async Task AddAsync(Venta venta)
    {
        await _context.Ventas.AddAsync(venta);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Venta venta)
    {
        _context.Ventas.Update(venta);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var venta = await _context.Ventas.FindAsync(id);
        if (venta != null)
        {
            _context.Ventas.Remove(venta);
            await _context.SaveChangesAsync();
        }
    }
}
