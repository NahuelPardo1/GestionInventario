using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Services;

public class PrestamoService : IPrestamoService
{
    private readonly IPrestamoRepository _repository;

    public PrestamoService(IPrestamoRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Prestamo>> GetAllAsync() =>
        await _repository.GetAllAsync();

    public async Task<Prestamo?> GetByIdAsync(int id) =>
        await _repository.GetByIdAsync(id);

    public async Task<Prestamo> CreateAsync(PrestamoCreateDto dto)
    {
        var prestamo = new Prestamo
        {
            LibroId = dto.LibroId,
            ClienteId = dto.ClienteId,
            FechaPrestamo = dto.FechaPrestamo,
            FechaDevolucion = dto.FechaDevolucion
        };
        await _repository.AddAsync(prestamo);
        return prestamo;
    }

    public async Task<bool> UpdateAsync(int id, PrestamoCreateDto dto)
    {
        var prestamo = await _repository.GetByIdAsync(id);
        if (prestamo == null) return false;

        prestamo.LibroId = dto.LibroId;
        prestamo.ClienteId = dto.ClienteId;
        prestamo.FechaPrestamo = dto.FechaPrestamo;
        prestamo.FechaDevolucion = dto.FechaDevolucion;

        await _repository.UpdateAsync(prestamo);
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var prestamo = await _repository.GetByIdAsync(id);
        if (prestamo == null) return false;
        await _repository.DeleteAsync(id);
        return true;
    }
}
