using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using GestionInventario.Application.DTOs.Auth;
using GestionInventario.Application.Interfaces;
using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace GestionInventario.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly IConfiguration _configuration;

    public AuthService(IUsuarioRepository usuarioRepository, IConfiguration configuration)
    {
        _usuarioRepository = usuarioRepository;
        _configuration = configuration;
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
    {
        var usuario = await _usuarioRepository.GetByEmailAsync(loginDto.Email);
        
        if (usuario == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, usuario.PasswordHash))
        {
            throw new Exception("Credenciales inválidas.");
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:Secret"] ?? string.Empty);
        
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                new Claim(ClaimTypes.Name, usuario.Nombre),
                new Claim(ClaimTypes.Email, usuario.Email),
                new Claim(ClaimTypes.Role, usuario.Rol.ToString())
            }),
            Expires = DateTime.UtcNow.AddHours(2),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        
        var token = tokenHandler.CreateToken(tokenDescriptor);
        
        return new AuthResponseDto
        {
            Token = tokenHandler.WriteToken(token),
            Usuario = usuario.Nombre,
            Rol = usuario.Rol
        };
    }

    public async Task RegisterAsync(UsuarioCreateDto usuarioCreateDto)
    {
        var existingUser = await _usuarioRepository.GetByEmailAsync(usuarioCreateDto.Email);
        if (existingUser != null)
        {
            throw new Exception("El email ya está registrado.");
        }

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(usuarioCreateDto.Password);
        
        var newUser = new Usuario
        {
            Nombre = usuarioCreateDto.Nombre,
            Email = usuarioCreateDto.Email,
            PasswordHash = passwordHash,
            Rol = usuarioCreateDto.Rol
        };

        await _usuarioRepository.AgregarAsync(newUser);
    }
}
