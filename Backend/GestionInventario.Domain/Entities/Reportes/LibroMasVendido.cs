namespace GestionInventario.Domain.Entities.Reportes;

public class LibroMasVendido
{
    public int LibroId { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public int CantidadTotal { get; set; }
}
