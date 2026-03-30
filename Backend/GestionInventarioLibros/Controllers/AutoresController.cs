using Microsoft.AspNetCore.Mvc;
using GestionInventario.Domain.Entities;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;

namespace GestionInventarioLibros.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AutoresController : ControllerBase
{
    private readonly IAutorService _service;

    public AutoresController(IAutorService service) => _service = service;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Autor>>> Get()
        => Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<Autor>> Get(int id)
    {
        var autor = await _service.GetByIdAsync(id);
        if (autor == null) return NotFound();
        return Ok(autor);
    }

    [HttpPost]
    public async Task<ActionResult<Autor>> Post(AutorCreateDto dto)
    {
        var autor = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(Get), new { id = autor.Id }, autor);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, AutorCreateDto dto)
    {
        if (!await _service.UpdateAsync(id, dto)) return NotFound();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        if (!await _service.DeleteAsync(id)) return NotFound();
        return NoContent();
    }
}
