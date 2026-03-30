namespace GestionInventario.Application.DTOs;

public class DashboardDto
{
    public int TotalLibros { get; set; }
    public int TotalClientes { get; set; }
    public int TotalVentas { get; set; }
    public decimal GananciasTotales { get; set; }
    public IEnumerable<LibroStockCriticoDto> LibrosStockCritico { get; set; } = new List<LibroStockCriticoDto>();
}

public class LibroStockCriticoDto
{
    public int LibroId { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public int StockActual { get; set; }
}
