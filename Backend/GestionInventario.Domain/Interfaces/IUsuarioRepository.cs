using GestionInventario.Domain.Entities;

namespace GestionInventario.Domain.Interfaces;

public interface IUsuarioRepository
{
    Task<Usuario?> GetByEmailAsync(string email);
    Task AgregarAsync(Usuario usuario);
}
