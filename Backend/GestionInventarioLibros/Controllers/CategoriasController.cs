using Microsoft.AspNetCore.Mvc;
using GestionInventario.Domain.Entities;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;

namespace GestionInventarioLibros.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriasController : ControllerBase
{
    private readonly ICategoriaService _service;
    public CategoriasController(ICategoriaService service) => _service = service;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoriaDto>>> Get()
        => Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<CategoriaDto>> Get(int id)
        => Ok(await _service.GetByIdAsync(id));

    [HttpPost]
    public async Task<ActionResult<CategoriaDto>> Post(CategoriaCreateDto dto)
    {
        var categoria = await _service.CreateAsync(dto);
        return Ok(categoria);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, CategoriaCreateDto dto)
    {
        await _service.UpdateAsync(id, dto);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}