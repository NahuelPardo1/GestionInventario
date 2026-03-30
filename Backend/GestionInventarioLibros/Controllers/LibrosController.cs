using Microsoft.AspNetCore.Mvc;
using GestionInventario.Domain.Entities;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;

namespace GestionInventarioLibros.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LibrosController : ControllerBase
{
    private readonly ILibroService _libroService;

    public LibrosController(ILibroService libroService)
    {
        _libroService = libroService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Libro>>> Get()
    {
        var libros = await _libroService.GetAllAsync();
        return Ok(libros);
    }

    [HttpGet("buscar")]
    public async Task<ActionResult<IEnumerable<Libro>>> Buscar(
        [FromQuery] string? titulo,
        [FromQuery] int? autorId,
        [FromQuery] int? categoriaId)
    {
        var libros = await _libroService.SearchAsync(titulo, autorId, categoriaId);
        return Ok(libros);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Libro>> Get(int id)
    {
        // El Middleware manejará el 404 si el servicio lanza NotFoundException
        var libro = await _libroService.GetByIdAsync(id);
        return Ok(libro);
    }

    [HttpPost]
    public async Task<ActionResult<Libro>> Post(LibroCreateDto libroDto)
    {
        // El Middleware manejará el 400 si el servicio lanza ValidationException
        var nuevoLibro = await _libroService.CreateAsync(libroDto);
        return CreatedAtAction(nameof(Get), new { id = nuevoLibro.Id }, nuevoLibro);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, LibroCreateDto libroDto)
    {
        await _libroService.UpdateAsync(id, libroDto);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _libroService.DeleteAsync(id);
        return NoContent();
    }
}