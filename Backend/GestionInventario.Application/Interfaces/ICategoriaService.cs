using GestionInventario.Domain.Entities;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Interfaces;

public interface ICategoriaService
{
    Task<IEnumerable<Categoria>> GetAllAsync();
    Task<Categoria> GetByIdAsync(int id);
    Task<Categoria> CreateAsync(CategoriaCreateDto dto);
    Task UpdateAsync(int id, CategoriaCreateDto dto);
    Task DeleteAsync(int id);
}
