using FluentValidation;
using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Domain.Exceptions;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;
using AutoMapper;

namespace GestionInventario.Application.Services;

public class AutorService : IAutorService
{
    private readonly IAutorRepository _repository;
    private readonly IValidator<AutorCreateDto> _validator;
    private readonly IMapper _mapper;

    public AutorService(IAutorRepository repository, IValidator<AutorCreateDto> validator, IMapper mapper)
    {
        _repository = repository;
        _validator = validator;
        _mapper = mapper;
    }

    public async Task<IEnumerable<AutorDto>> GetAllAsync()
    {
        var autores = await _repository.GetAllAsync();
        return _mapper.Map<IEnumerable<AutorDto>>(autores);
    }

    public async Task<AutorDto> GetByIdAsync(int id)
    {
        var autor = await _repository.GetByIdAsync(id);
        if (autor == null) throw new NotFoundException($"El autor con ID {id} no fue encontrado.");
        return _mapper.Map<AutorDto>(autor);
    }

    public async Task<AutorDto> CreateAsync(AutorCreateDto dto)
    {
        await ValidarAsync(dto);
        var autor = new Autor
        {
            Nombre = dto.Nombre,
            Nacionalidad = dto.Nacionalidad,
            FechaNacimiento = dto.FechaNacimiento,
            Biografia = dto.Biografia
        };
        await _repository.AddAsync(autor);
        return _mapper.Map<AutorDto>(autor);
    }

    public async Task UpdateAsync(int id, AutorCreateDto dto)
    {
        await ValidarAsync(dto);
        var autor = await _repository.GetByIdAsync(id);
        if (autor == null) throw new NotFoundException($"El autor con ID {id} no fue encontrado.");
        autor.Nombre = dto.Nombre;
        autor.Nacionalidad = dto.Nacionalidad;
        autor.FechaNacimiento = dto.FechaNacimiento;
        autor.Biografia = dto.Biografia;
        await _repository.UpdateAsync(autor);
    }

    public async Task DeleteAsync(int id)
    {
        var autor = await _repository.GetByIdAsync(id);
        if (autor == null) throw new NotFoundException($"El autor con ID {id} no fue encontrado.");
        await _repository.DeleteAsync(id);
    }

    private async Task ValidarAsync(AutorCreateDto dto)
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
