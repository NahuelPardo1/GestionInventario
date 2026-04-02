using GestionInventario.Domain.Enums;

namespace GestionInventario.Application.DTOs;

public class StockDto
{
    public int Id { get; set; }
    public int LibroId { get; set; }
    public Tipo Tipo { get; set; }
    public int Cantidad { get; set; }
    public DateTime Fecha { get; set; }
}
