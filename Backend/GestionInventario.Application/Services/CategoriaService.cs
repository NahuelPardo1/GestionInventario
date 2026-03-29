using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Services;

public class CategoriaService : ICategoriaService
{
    private readonly ICategoriaRepository _repository;

    public CategoriaService(ICategoriaRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Categoria>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<Categoria?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<Categoria> CreateAsync(CategoriaCreateDto dto)
    {
        var categoria = new Categoria
        {
            Nombre = dto.Nombre
        };

        await _repository.AddAsync(categoria);
        return categoria;
    }

    public async Task<bool> UpdateAsync(int id, CategoriaCreateDto dto)
    {
        var CategoriaExistente = await _repository.GetByIdAsync(id);
        if (CategoriaExistente == null) return false;

        CategoriaExistente.Nombre = dto.Nombre;

        await _repository.UpdateAsync(CategoriaExistente);
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var CategoriaExistente = await _repository.GetByIdAsync(id);
        if (CategoriaExistente == null) return false;

        await _repository.DeleteAsync(id);
        return true;
    }
}
