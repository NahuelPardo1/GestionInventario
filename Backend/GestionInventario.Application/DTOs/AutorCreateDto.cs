namespace GestionInventario.Application.DTOs;

public class AutorCreateDto
{
    public string Nombre { get; set; } = string.Empty;
    public string Nacionalidad { get; set; } = string.Empty;
    public DateTime FechaNacimiento { get; set; }
    public string Biografia { get; set; } = string.Empty;
}
