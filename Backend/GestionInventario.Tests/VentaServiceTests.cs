using Moq;
using FluentAssertions;
using GestionInventario.Application.Services;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Domain.Entities;
using GestionInventario.Application.DTOs;
using GestionInventario.Application.Interfaces;
using AutoMapper;
using FluentValidation;
using FluentValidation.Results;

namespace GestionInventario.Tests;

public class VentaServiceTests
{
    private readonly Mock<IVentaRepository> _repositoryMock;
    private readonly Mock<IStockService> _stockServiceMock;
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<IValidator<VentaCreateDto>> _validatorMock;
    private readonly VentaService _service;

    public VentaServiceTests()
    {
        _repositoryMock = new Mock<IVentaRepository>();
        _stockServiceMock = new Mock<IStockService>();
        _mapperMock = new Mock<IMapper>();
        _validatorMock = new Mock<IValidator<VentaCreateDto>>();
        _service = new VentaService(_repositoryMock.Object, _stockServiceMock.Object, _validatorMock.Object, _mapperMock.Object);
    }

    [Fact]
    public async Task CreateAsync_CuandoNoHayStock_DebeLanzarValidationException()
    {
        var dto = new VentaCreateDto { LibroId = 1, Cantidad = 10 };
        _validatorMock.Setup(v => v.ValidateAsync(dto, default))
            .ReturnsAsync(new ValidationResult());
        _stockServiceMock.Setup(s => s.GetStockActualAsync(dto.LibroId))
            .ReturnsAsync(5);

        await _service.Awaiting(s => s.CreateAsync(dto))
            .Should().ThrowAsync<GestionInventario.Domain.Exceptions.ValidationException>();
    }

    [Fact]
    public async Task CreateAsync_CuandoHayStock_DebeCrearVentaYDescontarStock()
    {
        var dto = new VentaCreateDto { LibroId = 1, Cantidad = 2, Total = 100 };
        _validatorMock.Setup(v => v.ValidateAsync(dto, default))
            .ReturnsAsync(new ValidationResult());
        _stockServiceMock.Setup(s => s.GetStockActualAsync(dto.LibroId))
            .ReturnsAsync(10); 

        await _service.CreateAsync(dto);

        _repositoryMock.Verify(r => r.AddAsync(It.IsAny<Venta>()), Times.Once);
    }

    [Fact]
    public async Task DeleteAsync_DebeEliminarVentaYDevolverStock()
    {
        var ventaId = 1;
        var venta = new Venta { Id = ventaId, LibroId = 1, Cantidad = 5 };
        _repositoryMock.Setup(r => r.GetByIdAsync(ventaId))
            .ReturnsAsync(venta);

        await _service.DeleteAsync(ventaId);

        _stockServiceMock.Verify(s => s.CreateAsync(It.Is<StockCreateDto>(st => st.Tipo == GestionInventario.Domain.Enums.Tipo.Entrada)), Times.Once);
        _repositoryMock.Verify(r => r.DeleteAsync(ventaId), Times.Once);
    }
}
