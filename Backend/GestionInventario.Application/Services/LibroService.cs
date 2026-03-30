using FluentValidation;
using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Domain.Exceptions;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Services;

public class LibroService : ILibroService
{
    private readonly ILibroRepository _repository;
    private readonly IValidator<LibroCreateDto> _validator;

    public LibroService(ILibroRepository repository, IValidator<LibroCreateDto> validator)
    {
        _repository = repository;
        _validator = validator;
    }

    public async Task<IEnumerable<Libro>> GetAllAsync() =>
        await _repository.GetAllAsync();

    public async Task<Libro> GetByIdAsync(int id)
    {
        var libro = await _repository.GetByIdAsync(id);
        if (libro == null) throw new NotFoundException($"El libro con ID {id} no fue encontrado.");
        return libro;
    }

    public async Task<IEnumerable<Libro>> SearchAsync(string? titulo, int? autorId, int? categoriaId) =>
        await _repository.SearchAsync(titulo, autorId, categoriaId);

    public async Task<Libro> CreateAsync(LibroCreateDto dto)
    {
        var validationResult = await _validator.ValidateAsync(dto);
        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors
                .GroupBy(e => e.PropertyName)
                .ToDictionary(g => g.Key, g => g.Select(x => x.ErrorMessage).ToArray());
            throw new GestionInventario.Domain.Exceptions.ValidationException(errors);
        }

        var libro = new Libro
        {
            Titulo = dto.Titulo,
            AutorId = dto.AutorId,
            Precio = dto.Precio,
            FechaPublicacion = dto.FechaPublicacion,
            ImagenURL = dto.ImagenURL,
            CategoriaId = dto.CategoriaId ?? 0
        };
        await _repository.AddAsync(libro);
        return libro;
    }

    public async Task UpdateAsync(int id, LibroCreateDto dto)
    {
        var validationResult = await _validator.ValidateAsync(dto);
        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors
                .GroupBy(e => e.PropertyName)
                .ToDictionary(g => g.Key, g => g.Select(x => x.ErrorMessage).ToArray());
            throw new GestionInventario.Domain.Exceptions.ValidationException(errors);
        }

        var libroExistente = await _repository.GetByIdAsync(id);
        if (libroExistente == null) throw new NotFoundException($"El libro con ID {id} no fue encontrado.");

        libroExistente.Titulo = dto.Titulo;
        libroExistente.AutorId = dto.AutorId;
        libroExistente.Precio = dto.Precio;
        libroExistente.FechaPublicacion = dto.FechaPublicacion;
        libroExistente.ImagenURL = dto.ImagenURL;
        libroExistente.CategoriaId = dto.CategoriaId ?? 0;

        await _repository.UpdateAsync(libroExistente);
    }

    public async Task DeleteAsync(int id)
    {
        var libroExistente = await _repository.GetByIdAsync(id);
        if (libroExistente == null) throw new NotFoundException($"El libro con ID {id} no fue encontrado.");
        await _repository.DeleteAsync(id);
    }
}
