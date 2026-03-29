using GestionInventario.Domain.Entities;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Interfaces;

public interface ILibroService
{
    Task<IEnumerable<Libro>> GetAllAsync();
    Task<Libro?> GetByIdAsync(int id);
    Task<Libro> CreateAsync(LibroCreateDto dto);
    Task<bool> UpdateAsync(int id, LibroCreateDto dto);
    Task<bool> DeleteAsync(int id);
}
