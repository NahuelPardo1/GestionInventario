using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Services;

public class ClienteService : IClienteService
{
    private readonly IClienteRepository _repository;

    public ClienteService(IClienteRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Cliente>> GetAllAsync() =>
        await _repository.GetAllAsync();

    public async Task<Cliente?> GetByIdAsync(int id) =>
        await _repository.GetByIdAsync(id);

    public async Task<Cliente> CreateAsync(ClienteCreateDto dto)
    {
        var cliente = new Cliente
        {
            Nombre = dto.Nombre,
            Email = dto.Email,
            Telefono = dto.Telefono,
            Direccion = dto.Direccion
        };
        await _repository.AddAsync(cliente);
        return cliente;
    }

    public async Task<bool> UpdateAsync(int id, ClienteCreateDto dto)
    {
        var cliente = await _repository.GetByIdAsync(id);
        if (cliente == null) return false;

        cliente.Nombre = dto.Nombre;
        cliente.Email = dto.Email;
        cliente.Telefono = dto.Telefono;
        cliente.Direccion = dto.Direccion;

        await _repository.UpdateAsync(cliente);
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var cliente = await _repository.GetByIdAsync(id);
        if (cliente == null) return false;
        await _repository.DeleteAsync(id);
        return true;
    }
}
