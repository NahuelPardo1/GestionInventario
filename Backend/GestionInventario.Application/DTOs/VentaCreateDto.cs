namespace GestionInventario.Application.DTOs;

public class VentaCreateDto
{
    public int LibroId { get; set; }
    public int ClienteId { get; set; }
    public DateTime FechaVenta { get; set; }
    public int Cantidad { get; set; }
    public decimal Total { get; set; }
}
