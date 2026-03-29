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

    [HttpGet("{id}")]
    public async Task<ActionResult<Libro>> Get(int id)
    {
        var libro = await _libroService.GetByIdAsync(id);
        if (libro == null) return NotFound();
        return Ok(libro);
    }

    [HttpPost]
    public async Task<ActionResult<Libro>> Post(LibroCreateDto dto)
    {
        var libro = await _libroService.CreateAsync(dto);
        return CreatedAtAction(nameof(Get), new { id = libro.Id }, libro);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, LibroCreateDto dto)
    {
        var result = await _libroService.UpdateAsync(id, dto);
        if (!result) return NotFound();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _libroService.DeleteAsync(id);
        if (!result) return NotFound();
        return NoContent();
    }
}