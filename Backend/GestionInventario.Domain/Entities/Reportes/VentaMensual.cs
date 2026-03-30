namespace GestionInventario.Domain.Entities.Reportes;

public class VentaMensual
{
    public int Anio { get; set; }
    public int Mes { get; set; }
    public decimal TotalGanancias { get; set; }
    public int CantidadVentas { get; set; }
}
