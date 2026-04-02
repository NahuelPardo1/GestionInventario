using Moq;
using FluentAssertions;
using GestionInventario.Application.Services;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Domain.Entities;
using GestionInventario.Application.DTOs;
using AutoMapper;
using FluentValidation;
using FluentValidation.Results;

namespace GestionInventario.Tests;

public class StockServiceTests
{
    private readonly Mock<IStockRepository> _repositoryMock;
    private readonly Mock<IValidator<StockCreateDto>> _validatorMock;
    private readonly Mock<IMapper> _mapperMock;
    private readonly StockService _service;

    public StockServiceTests()
    {
        _repositoryMock = new Mock<IStockRepository>();
        _validatorMock = new Mock<IValidator<StockCreateDto>>();
        _mapperMock = new Mock<IMapper>();
        _service = new StockService(_repositoryMock.Object, _validatorMock.Object, _mapperMock.Object);
    }

    [Fact]
    public async Task GetStockActualAsync_DebeRetornarCantidadDesdeRepositorio()
    {
        var libroId = 1;
        var cantidadEsperada = 15;
        _repositoryMock.Setup(r => r.GetStockActualAsync(libroId))
            .ReturnsAsync(cantidadEsperada);

        var result = await _service.GetStockActualAsync(libroId);

        result.Should().Be(cantidadEsperada);
    }

    [Fact]
    public async Task CreateAsync_CuandoDatosSonValidos_DebeGuardarMovimiento()
    {
        var dto = new StockCreateDto { LibroId = 1, Cantidad = 10, Tipo = GestionInventario.Domain.Enums.Tipo.Entrada };
        _validatorMock.Setup(v => v.ValidateAsync(dto, default))
            .ReturnsAsync(new ValidationResult());

        await _service.CreateAsync(dto);

        _repositoryMock.Verify(r => r.AddAsync(It.Is<Stock>(s => s.Cantidad == 10 && s.Tipo == GestionInventario.Domain.Enums.Tipo.Entrada)), Times.Once);
    }
}
