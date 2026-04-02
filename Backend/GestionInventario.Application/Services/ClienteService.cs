using FluentValidation;
using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Domain.Exceptions;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;
using AutoMapper;

namespace GestionInventario.Application.Services;

public class ClienteService : IClienteService
{
    private readonly IClienteRepository _repository;
    private readonly IValidator<ClienteCreateDto> _validator;
    private readonly IMapper _mapper;

    public ClienteService(IClienteRepository repository, IValidator<ClienteCreateDto> validator, IMapper mapper)
    {
        _repository = repository;
        _validator = validator;
        _mapper = mapper;
    }

    public async Task<PagedResult<ClienteDto>> GetAllAsync(int pageNumber = 1, int pageSize = 10)
    {
        int skip = (pageNumber - 1) * pageSize;
        var (items, totalCount) = await _repository.GetAllAsync(skip, pageSize);
        return new PagedResult<ClienteDto>
        {
            Items = _mapper.Map<IEnumerable<ClienteDto>>(items),
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };
    }

    public async Task<ClienteDto> GetByIdAsync(int id)
    {
        var cliente = await _repository.GetByIdAsync(id);
        if (cliente == null) throw new NotFoundException($"El cliente con ID {id} no fue encontrado.");
        return _mapper.Map<ClienteDto>(cliente);
    }

    public async Task<ClienteDto> CreateAsync(ClienteCreateDto dto)
    {
        await ValidarAsync(dto);
        var cliente = new Cliente
        {
            Nombre = dto.Nombre,
            Email = dto.Email,
            Telefono = dto.Telefono,
            Direccion = dto.Direccion
        };
        await _repository.AddAsync(cliente);
        return _mapper.Map<ClienteDto>(cliente);
    }

    public async Task UpdateAsync(int id, ClienteCreateDto dto)
    {
        await ValidarAsync(dto);
        var cliente = await _repository.GetByIdAsync(id);
        if (cliente == null) throw new NotFoundException($"El cliente con ID {id} no fue encontrado.");
        cliente.Nombre = dto.Nombre;
        cliente.Email = dto.Email;
        cliente.Telefono = dto.Telefono;
        cliente.Direccion = dto.Direccion;
        await _repository.UpdateAsync(cliente);
    }

    public async Task DeleteAsync(int id)
    {
        var cliente = await _repository.GetByIdAsync(id);
        if (cliente == null) throw new NotFoundException($"El cliente con ID {id} no fue encontrado.");
        await _repository.DeleteAsync(id);
    }

    private async Task ValidarAsync(ClienteCreateDto dto)
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
