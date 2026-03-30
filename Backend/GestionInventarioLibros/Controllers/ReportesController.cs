using Microsoft.AspNetCore.Mvc;
using GestionInventario.Application.DTOs;
using GestionInventario.Application.Interfaces;

namespace GestionInventarioLibros.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReportesController : ControllerBase
{
    private readonly IReportesService _reportesService;

    public ReportesController(IReportesService reportesService)
    {
        _reportesService = reportesService;
    }

    [HttpGet("dashboard")]
    public async Task<ActionResult<DashboardDto>> GetDashboard()
    {
        return Ok(await _reportesService.GetDashboardResumenAsync());
    }

    [HttpGet("financiero")]
    public async Task<ActionResult<AnalisisFinancieroDto>> GetFinanciero([FromQuery] int meses = 12)
    {
        return Ok(await _reportesService.GetAnalisisFinancieroAsync(meses));
    }
}
