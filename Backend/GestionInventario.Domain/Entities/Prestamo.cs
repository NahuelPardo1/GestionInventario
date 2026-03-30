namespace GestionInventario.Domain.Entities;

public class Prestamo
{
    public int Id { get; set; }
    public int LibroId { get; set; }
    public int ClienteId { get; set; }
    public DateTime FechaPrestamo { get; set; }
    public DateTime? FechaDevolucion { get; set; }
    public Libro? Libro { get; set; }
    public Cliente? Cliente { get; set; }
}