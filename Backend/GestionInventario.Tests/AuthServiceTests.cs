using Moq;
using FluentAssertions;
using GestionInventario.Application.Services;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Domain.Entities;
using GestionInventario.Application.DTOs.Auth;
using Microsoft.Extensions.Configuration;
using GestionInventario.Domain.Enums;

namespace GestionInventario.Tests;

public class AuthServiceTests
{
    private readonly Mock<IUsuarioRepository> _usuarioRepositoryMock;
    private readonly Mock<IConfiguration> _configurationMock;
    private readonly AuthService _service;

    public AuthServiceTests()
    {
        _usuarioRepositoryMock = new Mock<IUsuarioRepository>();
        _configurationMock = new Mock<IConfiguration>();
        _configurationMock.Setup(c => c["JwtSettings:Secret"])
            .Returns("super_secret_key_1234567890_antigravity");

        _service = new AuthService(_usuarioRepositoryMock.Object, _configurationMock.Object);
    }

    [Fact]
    public async Task LoginAsync_ConCredencialesValidas_DebeRetornarToken()
    {
        var password = "password123";
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(password);
        var usuario = new Usuario
        {
            Id = 1,
            Email = "test@test.com",
            Nombre = "User Test",
            PasswordHash = passwordHash,
            Rol = RolUsuario.Administrador
        };

        _usuarioRepositoryMock.Setup(r => r.GetByEmailAsync(usuario.Email))
            .ReturnsAsync(usuario);

        var result = await _service.LoginAsync(new LoginDto { Email = usuario.Email, Password = password });

        result.Should().NotBeNull();
        result.Token.Should().NotBeEmpty();
    }

    [Fact]
    public async Task LoginAsync_ConPasswordIncorrecta_DebeLanzarExcepcion()
    {
        var usuario = new Usuario { Email = "test@test.com", PasswordHash = BCrypt.Net.BCrypt.HashPassword("correct") };
        _usuarioRepositoryMock.Setup(r => r.GetByEmailAsync(usuario.Email))
            .ReturnsAsync(usuario);

        await _service.Awaiting(s => s.LoginAsync(new LoginDto { Email = usuario.Email, Password = "wrong" }))
            .Should().ThrowAsync<Exception>();
    }

    [Fact]
    public async Task RegisterAsync_ConEmailDuplicado_DebeLanzarExcepcion()
    {
        var dto = new UsuarioCreateDto { Email = "exists@test.com" };
        _usuarioRepositoryMock.Setup(r => r.GetByEmailAsync(dto.Email))
            .ReturnsAsync(new Usuario());

        await _service.Awaiting(s => s.RegisterAsync(dto))
            .Should().ThrowAsync<Exception>();
    }
}
