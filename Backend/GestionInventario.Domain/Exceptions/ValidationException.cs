namespace GestionInventario.Domain.Exceptions;

public class ValidationException : BaseException
{
    public IDictionary<string, string[]> Errors { get; }

    public ValidationException(IDictionary<string, string[]> errors) 
        : base("Uno o más errores de validación han ocurrido.")
    {
        Errors = errors;
    }
}
