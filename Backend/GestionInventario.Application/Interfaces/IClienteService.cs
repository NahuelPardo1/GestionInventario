using GestionInventario.Domain.Entities;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Interfaces;

public interface IClienteService
{
    Task<PagedResult<ClienteDto>> GetAllAsync(int pageNumber = 1, int pageSize = 10);
    Task<ClienteDto> GetByIdAsync(int id);
    Task<ClienteDto> CreateAsync(ClienteCreateDto dto);
    Task UpdateAsync(int id, ClienteCreateDto dto);
    Task DeleteAsync(int id);
}
