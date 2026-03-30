namespace GestionInventario.Domain.Entities;

public class Venta
{
    public int Id { get; set; }
    public int LibroId { get; set; }
    public int ClienteId { get; set; }
    public DateTime FechaVenta { get; set; }
    public int Cantidad { get; set; }
    public decimal Total { get; set; }
    public Libro? Libro { get; set; }
    public Cliente? Cliente { get; set; }
}