using FluentValidation;
using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Domain.Exceptions;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Services;

public class CategoriaService : ICategoriaService
{
    private readonly ICategoriaRepository _repository;
    private readonly IValidator<CategoriaCreateDto> _validator;

    public CategoriaService(ICategoriaRepository repository, IValidator<CategoriaCreateDto> validator)
    {
        _repository = repository;
        _validator = validator;
    }

    public async Task<IEnumerable<Categoria>> GetAllAsync() =>
        await _repository.GetAllAsync();

    public async Task<Categoria> GetByIdAsync(int id)
    {
        var categoria = await _repository.GetByIdAsync(id);
        if (categoria == null) throw new NotFoundException($"La categoría con ID {id} no fue encontrada.");
        return categoria;
    }

    public async Task<Categoria> CreateAsync(CategoriaCreateDto dto)
    {
        await ValidarAsync(dto);
        var categoria = new Categoria { Nombre = dto.Nombre };
        await _repository.AddAsync(categoria);
        return categoria;
    }

    public async Task UpdateAsync(int id, CategoriaCreateDto dto)
    {
        await ValidarAsync(dto);
        var categoria = await _repository.GetByIdAsync(id);
        if (categoria == null) throw new NotFoundException($"La categoría con ID {id} no fue encontrada.");
        categoria.Nombre = dto.Nombre;
        await _repository.UpdateAsync(categoria);
    }

    public async Task DeleteAsync(int id)
    {
        var categoria = await _repository.GetByIdAsync(id);
        if (categoria == null) throw new NotFoundException($"La categoría con ID {id} no fue encontrada.");
        await _repository.DeleteAsync(id);
    }

    private async Task ValidarAsync(CategoriaCreateDto dto)
    {
        var result = await _validator.ValidateAsync(dto);
        if (!result.IsValid)
        {
            var errors = result.Errors
                .GroupBy(e => e.PropertyName)
                .ToDictionary(g => g.Key, g => g.Select(x => x.ErrorMessage).ToArray());
            throw new GestionInventario.Domain.Exceptions.ValidationException(errors);
        }
    }
}
