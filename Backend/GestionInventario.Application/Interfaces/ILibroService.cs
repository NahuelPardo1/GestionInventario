using GestionInventario.Domain.Entities;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Interfaces;

public interface ILibroService
{
    Task<PagedResult<LibroDto>> GetAllAsync(int pageNumber = 1, int pageSize = 10);
    Task<LibroDto> GetByIdAsync(int id);
    Task<PagedResult<LibroDto>> SearchAsync(string? titulo, int? autorId, int? categoriaId, int pageNumber = 1, int pageSize = 10);
    Task<LibroDto> CreateAsync(LibroCreateDto dto);
    Task UpdateAsync(int id, LibroCreateDto dto);
    Task DeleteAsync(int id);
}
