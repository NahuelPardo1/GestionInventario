using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Interfaces;

public interface IReportesService
{
    Task<DashboardDto> GetDashboardResumenAsync();
    // Obtiene datos de los últimos 'mesesAtras' meses para graficar
    Task<AnalisisFinancieroDto> GetAnalisisFinancieroAsync(int mesesAtras = 12);
}
