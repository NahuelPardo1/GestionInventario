using FluentValidation;
using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Domain.Exceptions;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;
using AutoMapper;

namespace GestionInventario.Application.Services;

public class LibroService : ILibroService
{
    private readonly ILibroRepository _repository;
    private readonly IValidator<LibroCreateDto> _validator;
    private readonly IMapper _mapper;

    public LibroService(ILibroRepository repository, IValidator<LibroCreateDto> validator, IMapper mapper)
    {
        _repository = repository;
        _validator = validator;
        _mapper = mapper;
    }

    public async Task<PagedResult<LibroDto>> GetAllAsync(int pageNumber = 1, int pageSize = 10)
    {
        int skip = (pageNumber - 1) * pageSize;
        var (items, totalCount) = await _repository.GetAllAsync(skip, pageSize);
        return new PagedResult<LibroDto>
        {
            Items = _mapper.Map<IEnumerable<LibroDto>>(items),
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };
    }

    public async Task<LibroDto> GetByIdAsync(int id)
    {
        var libro = await _repository.GetByIdAsync(id);
        if (libro == null) throw new NotFoundException($"El libro con ID {id} no fue encontrado.");
        return _mapper.Map<LibroDto>(libro);
    }

    public async Task<PagedResult<LibroDto>> SearchAsync(string? titulo, int? autorId, int? categoriaId, int pageNumber = 1, int pageSize = 10)
    {
        int skip = (pageNumber - 1) * pageSize;
        var (items, totalCount) = await _repository.SearchAsync(titulo, autorId, categoriaId, skip, pageSize);
        return new PagedResult<LibroDto>
        {
            Items = _mapper.Map<IEnumerable<LibroDto>>(items),
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };
    }

    public async Task<LibroDto> CreateAsync(LibroCreateDto dto)
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
        return _mapper.Map<LibroDto>(libro);
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
