using GestionInventario.Domain.Enums;

namespace GestionInventario.Application.DTOs;

public class StockCreateDto
{
    public int LibroId { get; set; }
    public Tipo Tipo { get; set; }  // 0 = Entrada, 1 = Salida
    public int Cantidad { get; set; }
    public DateTime Fecha { get; set; }
}
