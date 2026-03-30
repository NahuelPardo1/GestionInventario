namespace GestionInventario.Domain.Entities;


public class Autor
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Nacionalidad { get; set; } = string.Empty;
    public DateTime FechaNacimiento { get; set; }

    public string Biografia { get; set; } = string.Empty;

    public ICollection<Libro> Libros { get; set; } = new List<Libro>();
}