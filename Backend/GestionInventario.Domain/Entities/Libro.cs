namespace GestionInventario.Domain.Entities;

public class Libro
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public int AutorId { get; set; }
    public decimal Precio { get; set; }
    public DateTime? FechaPublicacion { get; set; }
    public string? ImagenURL { get; set; }
    public int CategoriaId { get; set; }
    public Categoria? Categoria { get; set; }

    public Autor? Autor { get; set; }

}