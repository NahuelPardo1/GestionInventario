using GestionInventario.Domain.Enums;

namespace GestionInventario.Domain.Entities;


public class Stock
{
    public int Id { get; set; }
    public int LibroId { get; set; }
    public Tipo Tipo { get; set; }
    public int Cantidad { get; set; }
    public DateTime Fecha { get; set; }
    public Libro? Libro { get; set; }
}