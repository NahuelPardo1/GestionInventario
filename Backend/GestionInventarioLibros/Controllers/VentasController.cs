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
    public async Task<ActionResult<PagedResult<VentaDto>>> Get([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        => Ok(await _service.GetAllAsync(pageNumber, pageSize));

    [HttpGet("{id}")]
    public async Task<ActionResult<VentaDto>> Get(int id)
        => Ok(await _service.GetByIdAsync(id));

    [HttpPost]
    public async Task<ActionResult<VentaDto>> Post(VentaCreateDto dto)
    {
        var venta = await _service.CreateAsync(dto);
        return Ok(venta);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, VentaCreateDto dto)
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
