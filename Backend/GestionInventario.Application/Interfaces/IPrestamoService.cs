using GestionInventario.Domain.Entities;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Interfaces;

public interface IPrestamoService
{
    Task<IEnumerable<Prestamo>> GetAllAsync();
    Task<Prestamo> GetByIdAsync(int id);
    Task<Prestamo> CreateAsync(PrestamoCreateDto dto);
    Task UpdateAsync(int id, PrestamoCreateDto dto);
    Task DeleteAsync(int id);
    Task DevolverAsync(int id);
}
