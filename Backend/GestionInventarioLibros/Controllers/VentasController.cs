using Microsoft.AspNetCore.Mvc;
using GestionInventario.Domain.Entities;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;

namespace GestionInventarioLibros.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VentasController : ControllerBase
{
    private readonly IVentaService _service;

    public VentasController(IVentaService service) => _service = service;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Venta>>> Get()
        => Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<Venta>> Get(int id)
    {
        var venta = await _service.GetByIdAsync(id);
        if (venta == null) return NotFound();
        return Ok(venta);
    }

    [HttpPost]
    public async Task<ActionResult<Venta>> Post(VentaCreateDto dto)
    {
        var venta = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(Get), new { id = venta.Id }, venta);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, VentaCreateDto dto)
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
