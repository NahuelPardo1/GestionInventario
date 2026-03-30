using GestionInventario.Domain.Entities;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Interfaces;

public interface IVentaService
{
    Task<IEnumerable<Venta>> GetAllAsync();
    Task<Venta?> GetByIdAsync(int id);
    Task<Venta> CreateAsync(VentaCreateDto dto);
    Task<bool> UpdateAsync(int id, VentaCreateDto dto);
    Task<bool> DeleteAsync(int id);
}
