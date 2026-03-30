namespace GestionInventario.Application.DTOs;

public class AnalisisFinancieroDto
{
    // Arrays paralelos ideales para gráficos (ej: Chart.js o ECharts)
    public List<string> LabelsMeses { get; set; } = new();
    public List<decimal> GananciasData { get; set; } = new();
    public List<int> VentasData { get; set; } = new();
    
    public List<LibroTopVendidoDto> TopLibrosVendidos { get; set; } = new();
}

public class LibroTopVendidoDto
{
    public string Titulo { get; set; } = string.Empty;
    public int CantidadVendida { get; set; }
}
