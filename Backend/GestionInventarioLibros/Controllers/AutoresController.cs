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
    public async Task<ActionResult<IEnumerable<AutorDto>>> Get()
        => Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<AutorDto>> Get(int id)
        => Ok(await _service.GetByIdAsync(id));

    [HttpPost]
    public async Task<ActionResult<AutorDto>> Post(AutorCreateDto dto)
    {
        Console.WriteLine("--> Entrando a Controller.Post");
        var autor = await _service.CreateAsync(dto);
        Console.WriteLine("--> Saliendo de Controller.Post. Retornando Ok.");
        return Ok(autor);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, AutorCreateDto dto)
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
