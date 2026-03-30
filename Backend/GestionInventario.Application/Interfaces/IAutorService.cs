using GestionInventario.Domain.Entities;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Interfaces;

public interface IAutorService
{
    Task<IEnumerable<Autor>> GetAllAsync();
    Task<Autor> GetByIdAsync(int id);
    Task<Autor> CreateAsync(AutorCreateDto dto);
    Task UpdateAsync(int id, AutorCreateDto dto);
    Task DeleteAsync(int id);
}
