using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Services;

public class VentaService : IVentaService
{
    private readonly IVentaRepository _repository;

    public VentaService(IVentaRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Venta>> GetAllAsync() =>
        await _repository.GetAllAsync();

    public async Task<Venta?> GetByIdAsync(int id) =>
        await _repository.GetByIdAsync(id);

    public async Task<Venta> CreateAsync(VentaCreateDto dto)
    {
        var venta = new Venta
        {
            LibroId = dto.LibroId,
            ClienteId = dto.ClienteId,
            FechaVenta = dto.FechaVenta,
            Cantidad = dto.Cantidad,
            Total = dto.Total
        };
        await _repository.AddAsync(venta);
        return venta;
    }

    public async Task<bool> UpdateAsync(int id, VentaCreateDto dto)
    {
        var venta = await _repository.GetByIdAsync(id);
        if (venta == null) return false;

        venta.LibroId = dto.LibroId;
        venta.ClienteId = dto.ClienteId;
        venta.FechaVenta = dto.FechaVenta;
        venta.Cantidad = dto.Cantidad;
        venta.Total = dto.Total;

        await _repository.UpdateAsync(venta);
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var venta = await _repository.GetByIdAsync(id);
        if (venta == null) return false;
        await _repository.DeleteAsync(id);
        return true;
    }
}
