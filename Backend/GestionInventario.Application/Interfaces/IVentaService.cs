using GestionInventario.Domain.Entities;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Interfaces;

public interface IVentaService
{
    Task<PagedResult<VentaDto>> GetAllAsync(int pageNumber = 1, int pageSize = 10);
    Task<VentaDto> GetByIdAsync(int id);
    Task<VentaDto> CreateAsync(VentaCreateDto dto);
    Task UpdateAsync(int id, VentaCreateDto dto);
    Task DeleteAsync(int id);
}
