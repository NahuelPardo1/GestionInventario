using GestionInventario.Domain.Entities;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Interfaces;

public interface IPrestamoService
{
    Task<IEnumerable<Prestamo>> GetAllAsync();
    Task<Prestamo?> GetByIdAsync(int id);
    Task<Prestamo> CreateAsync(PrestamoCreateDto dto);
    Task<bool> UpdateAsync(int id, PrestamoCreateDto dto);
    Task<bool> DeleteAsync(int id);
}
