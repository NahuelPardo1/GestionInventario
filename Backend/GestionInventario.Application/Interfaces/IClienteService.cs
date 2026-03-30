using GestionInventario.Domain.Entities;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Interfaces;

public interface IClienteService
{
    Task<IEnumerable<Cliente>> GetAllAsync();
    Task<Cliente> GetByIdAsync(int id);
    Task<Cliente> CreateAsync(ClienteCreateDto dto);
    Task UpdateAsync(int id, ClienteCreateDto dto);
    Task DeleteAsync(int id);
}
