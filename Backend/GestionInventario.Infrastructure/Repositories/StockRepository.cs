using Microsoft.EntityFrameworkCore;
using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Domain.Enums;

namespace GestionInventario.Infrastructure.Repositories;

public class StockRepository : IStockRepository
{
    private readonly ApplicationDbContext _context;

    public StockRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<(IEnumerable<Stock> Items, int TotalCount)> GetAllAsync(int skip, int take)
    {
        var query = _context.Stocks
            .Include(s => s.Libro);

        var total = await query.CountAsync();
        var items = await query.Skip(skip).Take(take).ToListAsync();
        return (items, total);
    }

    public async Task<Stock?> GetByIdAsync(int id) =>
        await _context.Stocks.FindAsync(id);

    public async Task<(IEnumerable<Stock> Items, int TotalCount)> GetByLibroIdAsync(int libroId, int skip, int take)
    {
        var query = _context.Stocks
            .Where(s => s.LibroId == libroId);

        var total = await query.CountAsync();
        var items = await query.Skip(skip).Take(take).ToListAsync();
        return (items, total);
    }

    public async Task<int> GetStockActualAsync(int libroId)
    {
        var movimientos = await _context.Stocks
            .Where(s => s.LibroId == libroId)
            .ToListAsync();

        return movimientos.Sum(s => s.Tipo == Tipo.Entrada ? s.Cantidad : -s.Cantidad);
    }

    public async Task AddAsync(Stock stock)
    {
        await _context.Stocks.AddAsync(stock);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Stock stock)
    {
        _context.Stocks.Update(stock);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var stock = await _context.Stocks.FindAsync(id);
        if (stock != null)
        {
            _context.Stocks.Remove(stock);
            await _context.SaveChangesAsync();
        }
    }
}
