using GestionInventario.Application.DTOs.Auth;

namespace GestionInventario.Application.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
    Task RegisterAsync(UsuarioCreateDto usuarioCreateDto);
}
