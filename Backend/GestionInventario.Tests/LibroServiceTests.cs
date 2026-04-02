using Moq;
using FluentAssertions;
using GestionInventario.Application.Services;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Domain.Entities;
using GestionInventario.Application.DTOs;
using AutoMapper;
using FluentValidation;
using GestionInventario.Domain.Exceptions;
using FluentValidation.Results;

namespace GestionInventario.Tests;

public class LibroServiceTests
{
    private readonly Mock<ILibroRepository> _repositoryMock;
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<IValidator<LibroCreateDto>> _validatorMock;
    private readonly LibroService _service;

    public LibroServiceTests()
    {
        _repositoryMock = new Mock<ILibroRepository>();
        _mapperMock = new Mock<IMapper>();
        _validatorMock = new Mock<IValidator<LibroCreateDto>>();
        _service = new LibroService(_repositoryMock.Object, _validatorMock.Object, _mapperMock.Object);
    }

    [Fact]
    public async Task GetByIdAsync_CuandoElLibroExiste_DebeRetornarLibroDto()
    {
        var libroId = 1;
        var libroEntity = new Libro { Id = libroId, Titulo = "Libro de Prueba" };
        var libroDto = new LibroDto { Id = libroId, Titulo = "Libro de Prueba" };

        _repositoryMock.Setup(repo => repo.GetByIdAsync(libroId))
            .ReturnsAsync(libroEntity);

        _mapperMock.Setup(m => m.Map<LibroDto>(libroEntity))
            .Returns(libroDto);

        var resultado = await _service.GetByIdAsync(libroId);

        resultado.Should().NotBeNull();
        resultado.Id.Should().Be(libroId);
    }

    [Fact]
    public async Task GetByIdAsync_CuandoElLibroNoExiste_DebeLanzarNotFoundException()
    {
        var libroId = 999;
        _repositoryMock.Setup(repo => repo.GetByIdAsync(libroId))
            .ReturnsAsync((Libro)null!);

        await _service.Awaiting(s => s.GetByIdAsync(libroId))
            .Should().ThrowAsync<NotFoundException>();
    }

    [Fact]
    public async Task CreateAsync_CuandoValidacionFalla_DebeLanzarValidationException()
    {
        var dto = new LibroCreateDto { Titulo = "" };
        var failures = new List<ValidationFailure> { new ValidationFailure("Titulo", "El título es obligatorio.") };
        
        _validatorMock.Setup(v => v.ValidateAsync(dto, default))
            .ReturnsAsync(new ValidationResult(failures));

        await _service.Awaiting(s => s.CreateAsync(dto))
            .Should().ThrowAsync<GestionInventario.Domain.Exceptions.ValidationException>();
    }

    [Fact]
    public async Task DeleteAsync_CuandoIdNoExiste_DebeLanzarNotFoundException()
    {
        _repositoryMock.Setup(r => r.GetByIdAsync(It.IsAny<int>()))
            .ReturnsAsync((Libro)null!);

        await _service.Awaiting(s => s.DeleteAsync(1))
            .Should().ThrowAsync<NotFoundException>();
    }
}
