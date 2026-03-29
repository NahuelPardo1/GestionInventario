using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;

namespace GestionInventario.Application.Services;

public class LibroService : ILibroService
{
    private readonly ILibroRepository _repository;

    public LibroService(ILibroRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<Libro>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<Libro?> GetByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<Libro> CreateAsync(LibroCreateDto dto)
    {
        var libro = new Libro
        {
            Titulo = dto.Titulo,
            Autor = dto.Autor,
            Precio = dto.Precio,
            FechaPublicacion = dto.FechaPublicacion,
            ImagenURL = dto.ImagenURL
        };

        await _repository.AddAsync(libro);
        return libro;
    }

    public async Task<bool> UpdateAsync(int id, LibroCreateDto dto)
    {
        var libroExistente = await _repository.GetByIdAsync(id);
        if (libroExistente == null) return false;

        libroExistente.Titulo = dto.Titulo;
        libroExistente.Autor = dto.Autor;
        libroExistente.Precio = dto.Precio;
        libroExistente.FechaPublicacion = dto.FechaPublicacion;
        libroExistente.ImagenURL = dto.ImagenURL;

        await _repository.UpdateAsync(libroExistente);
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var libroExistente = await _repository.GetByIdAsync(id);
        if (libroExistente == null) return false;

        await _repository.DeleteAsync(id);
        return true;
    }
}
