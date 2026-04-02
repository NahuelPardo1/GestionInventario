using Microsoft.AspNetCore.Mvc;
using GestionInventario.Domain.Entities;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;

namespace GestionInventarioLibros.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StocksController : ControllerBase
{
    private readonly IStockService _service;
    public StocksController(IStockService service) => _service = service;

    [HttpGet]
    public async Task<ActionResult<PagedResult<StockDto>>> Get([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        => Ok(await _service.GetAllAsync(pageNumber, pageSize));

    [HttpGet("{id}")]
    public async Task<ActionResult<StockDto>> Get(int id)
        => Ok(await _service.GetByIdAsync(id));

    [HttpGet("libro/{libroId}")]
    public async Task<ActionResult<PagedResult<StockDto>>> GetByLibro(int libroId, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        => Ok(await _service.GetByLibroIdAsync(libroId, pageNumber, pageSize));

    [HttpPost]
    public async Task<ActionResult<StockDto>> Post(StockCreateDto dto)
    {
        var stock = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(Get), new { id = stock.Id }, stock);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, StockCreateDto dto)
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
