namespace GestionInventario.Domain.Entities;


public class Cliente
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Telefono { get; set; } = string.Empty;
    public string Direccion { get; set; } = string.Empty;

    public ICollection<Venta> Ventas { get; set; } = new List<Venta>();
}