using Microsoft.EntityFrameworkCore;
using GestionInventario.Domain.Entities.Reportes;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Domain.Enums;

namespace GestionInventario.Infrastructure.Repositories;

public class ReportesRepository : IReportesRepository
{
    private readonly ApplicationDbContext _context;

    public ReportesRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> GetTotalLibrosAsync() => await _context.Libros.CountAsync();
    public async Task<int> GetTotalClientesAsync() => await _context.Clientes.CountAsync();
    public async Task<int> GetTotalVentasAsync() => await _context.Ventas.CountAsync();

    public async Task<decimal> GetGananciasTotalesAsync() =>
        await _context.Ventas.SumAsync(v => (decimal?)v.Total) ?? 0;

    public async Task<IEnumerable<VentaMensual>> GetVentasMensualesAsync(int mesesAtras)
    {
        var limiteFecha = DateTime.Now.AddMonths(-mesesAtras);

        var agrupado = await _context.Ventas
            .Where(v => v.FechaVenta >= limiteFecha)
            .GroupBy(v => new { v.FechaVenta.Year, v.FechaVenta.Month })
            .Select(g => new VentaMensual
            {
                Anio = g.Key.Year,
                Mes = g.Key.Month,
                TotalGanancias = g.Sum(x => x.Total),
                CantidadVentas = g.Count()
            })
            .OrderBy(vm => vm.Anio).ThenBy(vm => vm.Mes)
            .ToListAsync();

        return agrupado;
    }

    public async Task<IEnumerable<LibroMasVendido>> GetTopLibrosVendidosAsync(int top)
    {
        return await _context.Ventas
            .GroupBy(v => new { v.LibroId, v.Libro!.Titulo })
            .Select(g => new LibroMasVendido
            {
                LibroId = g.Key.LibroId,
                Titulo = g.Key.Titulo,
                CantidadTotal = g.Sum(x => x.Cantidad)
            })
            .OrderByDescending(x => x.CantidadTotal)
            .Take(top)
            .ToListAsync();
    }

    public async Task<IEnumerable<StockLibro>> GetStockCriticoAsync(int umbral)
    {
        // El stock real = Entradas - Salidas. 
        // Tipo 0 = Entrada, Tipo 1 = Salida
        var stockAgrupado = await _context.Stocks
            .GroupBy(s => new { s.LibroId, s.Libro!.Titulo })
            .Select(g => new StockLibro
            {
                LibroId = g.Key.LibroId,
                Titulo = g.Key.Titulo,
                StockActual = g.Sum(x => x.Tipo == Tipo.Entrada ? x.Cantidad : -x.Cantidad)
            })
            .Where(s => s.StockActual <= umbral)
            .OrderBy(s => s.StockActual)
            .ToListAsync();

        return stockAgrupado;
    }
}
