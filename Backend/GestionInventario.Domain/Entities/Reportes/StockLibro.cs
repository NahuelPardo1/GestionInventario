namespace GestionInventario.Domain.Entities.Reportes;

public class StockLibro
{
    public int LibroId { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public int StockActual { get; set; }
}
