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
    public async Task<ActionResult<IEnumerable<Stock>>> Get()
        => Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<Stock>> Get(int id)
    {
        var stock = await _service.GetByIdAsync(id);
        if (stock == null) return NotFound();
        return Ok(stock);
    }

    // Endpoint especial: GET api/stocks/libro/3 => todos los movimientos del libro 3
    [HttpGet("libro/{libroId}")]
    public async Task<ActionResult<IEnumerable<Stock>>> GetByLibro(int libroId)
        => Ok(await _service.GetByLibroIdAsync(libroId));

    [HttpPost]
    public async Task<ActionResult<Stock>> Post(StockCreateDto dto)
    {
        var stock = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(Get), new { id = stock.Id }, stock);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, StockCreateDto dto)
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
