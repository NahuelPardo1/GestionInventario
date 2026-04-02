using GestionInventario.Domain.Entities;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Interfaces;

public interface IPrestamoService
{
    Task<PagedResult<PrestamoDto>> GetAllAsync(int pageNumber = 1, int pageSize = 10);
    Task<PrestamoDto> GetByIdAsync(int id);
    Task<PrestamoDto> CreateAsync(PrestamoCreateDto dto);
    Task UpdateAsync(int id, PrestamoCreateDto dto);
    Task DeleteAsync(int id);
    Task DevolverAsync(int id);
}
