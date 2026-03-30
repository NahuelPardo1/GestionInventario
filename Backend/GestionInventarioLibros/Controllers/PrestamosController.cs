using Microsoft.AspNetCore.Mvc;
using GestionInventario.Domain.Entities;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;

namespace GestionInventarioLibros.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PrestamosController : ControllerBase
{
    private readonly IPrestamoService _service;

    public PrestamosController(IPrestamoService service) => _service = service;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Prestamo>>> Get()
        => Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<Prestamo>> Get(int id)
    {
        var prestamo = await _service.GetByIdAsync(id);
        if (prestamo == null) return NotFound();
        return Ok(prestamo);
    }

    [HttpPost]
    public async Task<ActionResult<Prestamo>> Post(PrestamoCreateDto dto)
    {
        var prestamo = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(Get), new { id = prestamo.Id }, prestamo);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, PrestamoCreateDto dto)
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
