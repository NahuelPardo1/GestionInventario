using GestionInventario.Domain.Entities;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Interfaces;

public interface IAutorService
{
    Task<IEnumerable<Autor>> GetAllAsync();
    Task<Autor?> GetByIdAsync(int id);
    Task<Autor> CreateAsync(AutorCreateDto dto);
    Task<bool> UpdateAsync(int id, AutorCreateDto dto);
    Task<bool> DeleteAsync(int id);
}
