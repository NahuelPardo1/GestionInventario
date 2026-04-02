using Microsoft.EntityFrameworkCore;
using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;

namespace GestionInventario.Infrastructure.Repositories;

public class ClienteRepository : IClienteRepository
{
    private readonly ApplicationDbContext _context;

    public ClienteRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<(IEnumerable<Cliente> Items, int TotalCount)> GetAllAsync(int skip, int take)
    {
        var total = await _context.Clientes.CountAsync();
        var items = await _context.Clientes.Skip(skip).Take(take).ToListAsync();
        return (items, total);
    }

    public async Task<Cliente?> GetByIdAsync(int id) =>
        await _context.Clientes.FindAsync(id);

    public async Task<bool> ExistsWithEmailAsync(string email, int? excludeId = null)
    {
        return await _context.Clientes
            .AnyAsync(c => c.Email == email && (!excludeId.HasValue || c.Id != excludeId.Value));
    }

    public async Task AddAsync(Cliente cliente)
    {
        await _context.Clientes.AddAsync(cliente);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Cliente cliente)
    {
        _context.Clientes.Update(cliente);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var cliente = await GetByIdAsync(id);
        if (cliente != null)
        {
            _context.Clientes.Remove(cliente);
            await _context.SaveChangesAsync();
        }
    }
}
