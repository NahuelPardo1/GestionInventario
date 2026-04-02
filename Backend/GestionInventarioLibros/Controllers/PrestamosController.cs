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
    public async Task<ActionResult<PagedResult<PrestamoDto>>> Get([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        => Ok(await _service.GetAllAsync(pageNumber, pageSize));

    [HttpGet("{id}")]
    public async Task<ActionResult<PrestamoDto>> Get(int id)
        => Ok(await _service.GetByIdAsync(id));

    [HttpPost]
    public async Task<ActionResult<PrestamoDto>> Post(PrestamoCreateDto dto)
    {
        var prestamo = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(Get), new { id = prestamo.Id }, prestamo);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, PrestamoCreateDto dto)
    {
        await _service.UpdateAsync(id, dto);
        return NoContent();
    }

    [HttpPut("{id}/devolver")]
    public async Task<IActionResult> Devolver(int id)
    {
        await _service.DevolverAsync(id);
        return Ok(new { Message = "El libro ha sido devuelto correctamente al stock." });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}
