using GestionInventario.Domain.Entities;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Interfaces;

public interface IAutorService
{
    Task<IEnumerable<AutorDto>> GetAllAsync();
    Task<AutorDto> GetByIdAsync(int id);
    Task<AutorDto> CreateAsync(AutorCreateDto dto);
    Task UpdateAsync(int id, AutorCreateDto dto);
    Task DeleteAsync(int id);
}
