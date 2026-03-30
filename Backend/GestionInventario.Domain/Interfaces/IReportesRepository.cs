using GestionInventario.Domain.Entities.Reportes;

namespace GestionInventario.Domain.Interfaces;

public interface IReportesRepository
{
    Task<int> GetTotalLibrosAsync();
    Task<int> GetTotalClientesAsync();
    Task<int> GetTotalVentasAsync();
    Task<decimal> GetGananciasTotalesAsync();
    
    Task<IEnumerable<VentaMensual>> GetVentasMensualesAsync(int mesesAtras);
    Task<IEnumerable<LibroMasVendido>> GetTopLibrosVendidosAsync(int top);
    Task<IEnumerable<StockLibro>> GetStockCriticoAsync(int umbral);
}
