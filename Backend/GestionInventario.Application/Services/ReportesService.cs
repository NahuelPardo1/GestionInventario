using GestionInventario.Application.DTOs;
using GestionInventario.Application.Interfaces;
using GestionInventario.Domain.Interfaces;

namespace GestionInventario.Application.Services;

public class ReportesService : IReportesService
{
    private readonly IReportesRepository _reportesRepo;

    public ReportesService(IReportesRepository reportesRepo)
    {
        _reportesRepo = reportesRepo;
    }

    public async Task<DashboardDto> GetDashboardResumenAsync()
    {
        var stockCriticoDomain = await _reportesRepo.GetStockCriticoAsync(10); // Alerta si hay 10 o menos

        return new DashboardDto
        {
            TotalLibros = await _reportesRepo.GetTotalLibrosAsync(),
            TotalClientes = await _reportesRepo.GetTotalClientesAsync(),
            TotalVentas = await _reportesRepo.GetTotalVentasAsync(),
            GananciasTotales = await _reportesRepo.GetGananciasTotalesAsync(),
            LibrosStockCritico = stockCriticoDomain.Select(s => new LibroStockCriticoDto
            {
                LibroId = s.LibroId,
                Titulo = s.Titulo,
                StockActual = s.StockActual
            })
        };
    }

    public async Task<AnalisisFinancieroDto> GetAnalisisFinancieroAsync(int mesesAtras = 12)
    {
        var ventasMensuales = await _reportesRepo.GetVentasMensualesAsync(mesesAtras);
        var topLibros = await _reportesRepo.GetTopLibrosVendidosAsync(5);

        var dto = new AnalisisFinancieroDto();

        // Rellenar meses vacíos para que el gráfico no salte (ideal para Chart.js)
        var fechaActual = DateTime.Now;
        for (int i = mesesAtras - 1; i >= 0; i--)
        {
            var fechaBase = fechaActual.AddMonths(-i);
            var nombreMes = fechaBase.ToString("MMM yyyy"); // Ej: "Mar 2026"
            
            var datosDelMes = ventasMensuales.FirstOrDefault(v => v.Anio == fechaBase.Year && v.Mes == fechaBase.Month);

            dto.LabelsMeses.Add(nombreMes);
            dto.GananciasData.Add(datosDelMes?.TotalGanancias ?? 0);
            dto.VentasData.Add(datosDelMes?.CantidadVentas ?? 0);
        }

        dto.TopLibrosVendidos = topLibros.Select(l => new LibroTopVendidoDto
        {
            Titulo = l.Titulo,
            CantidadVendida = l.CantidadTotal
        }).ToList();

        return dto;
    }
}
