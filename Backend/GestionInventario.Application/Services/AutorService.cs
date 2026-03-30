using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Services;

public class AutorService : IAutorService
{
    private readonly IAutorRepository _repository;

    public AutorService(IAutorRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Autor>> GetAllAsync() =>
        await _repository.GetAllAsync();

    public async Task<Autor?> GetByIdAsync(int id) =>
        await _repository.GetByIdAsync(id);

    public async Task<Autor> CreateAsync(AutorCreateDto dto)
    {
        var autor = new Autor
        {
            Nombre = dto.Nombre,
            Nacionalidad = dto.Nacionalidad,
            FechaNacimiento = dto.FechaNacimiento,
            Biografia = dto.Biografia
        };
        await _repository.AddAsync(autor);
        return autor;
    }

    public async Task<bool> UpdateAsync(int id, AutorCreateDto dto)
    {
        var autor = await _repository.GetByIdAsync(id);
        if (autor == null) return false;

        autor.Nombre = dto.Nombre;
        autor.Nacionalidad = dto.Nacionalidad;
        autor.FechaNacimiento = dto.FechaNacimiento;
        autor.Biografia = dto.Biografia;

        await _repository.UpdateAsync(autor);
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var autor = await _repository.GetByIdAsync(id);
        if (autor == null) return false;
        await _repository.DeleteAsync(id);
        return true;
    }
}
