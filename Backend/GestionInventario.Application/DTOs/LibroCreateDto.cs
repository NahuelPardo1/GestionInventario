namespace GestionInventario.Application.DTOs;

public class LibroCreateDto
{
    public string Titulo { get; set; } = string.Empty;
    public string Autor { get; set; } = string.Empty;
    public decimal Precio { get; set; }
    public DateTime? FechaPublicacion { get; set; }
    public string? ImagenURL { get; set; }
    public int CategoriaId { get; set; }

}