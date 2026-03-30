namespace GestionInventario.Application.DTOs;

public class PrestamoCreateDto
{
    public int LibroId { get; set; }
    public int ClienteId { get; set; }
    public DateTime FechaPrestamo { get; set; }
    public DateTime? FechaDevolucion { get; set; }
}
