using FluentValidation;
using GestionInventario.Domain.Entities;
using GestionInventario.Domain.Interfaces;
using GestionInventario.Domain.Exceptions;
using GestionInventario.Application.Interfaces;
using GestionInventario.Application.DTOs;
using AutoMapper;

namespace GestionInventario.Application.Services;

public class StockService : IStockService
{
    private readonly IStockRepository _repository;
    private readonly IValidator<StockCreateDto> _validator;
    private readonly IMapper _mapper;

    public StockService(IStockRepository repository, IValidator<StockCreateDto> validator, IMapper mapper)
    {
        _repository = repository;
        _validator = validator;
        _mapper = mapper;
    }

    public async Task<PagedResult<StockDto>> GetAllAsync(int pageNumber = 1, int pageSize = 10)
    {
        int skip = (pageNumber - 1) * pageSize;
        var (items, totalCount) = await _repository.GetAllAsync(skip, pageSize);
        return new PagedResult<StockDto>
        {
            Items = _mapper.Map<IEnumerable<StockDto>>(items),
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };
    }

    public async Task<StockDto> GetByIdAsync(int id)
    {
        var stock = await _repository.GetByIdAsync(id);
        if (stock == null) throw new NotFoundException($"El movimiento de stock con ID {id} no fue encontrado.");
        return _mapper.Map<StockDto>(stock);
    }

    public async Task<PagedResult<StockDto>> GetByLibroIdAsync(int libroId, int pageNumber = 1, int pageSize = 10)
    {
        int skip = (pageNumber - 1) * pageSize;
        var (items, totalCount) = await _repository.GetByLibroIdAsync(libroId, skip, pageSize);
        return new PagedResult<StockDto>
        {
            Items = _mapper.Map<IEnumerable<StockDto>>(items),
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };
    }

    public async Task<int> GetStockActualAsync(int libroId) =>
        await _repository.GetStockActualAsync(libroId);

    public async Task<StockDto> CreateAsync(StockCreateDto dto)
    {
        await ValidarAsync(dto);
        var stock = new Stock
        {
            LibroId = dto.LibroId,
            Tipo = dto.Tipo,
            Cantidad = dto.Cantidad,
            Fecha = dto.Fecha
        };
        await _repository.AddAsync(stock);
        return _mapper.Map<StockDto>(stock);
    }

    public async Task UpdateAsync(int id, StockCreateDto dto)
    {
        await ValidarAsync(dto);
        var stock = await _repository.GetByIdAsync(id);
        if (stock == null) throw new NotFoundException($"El movimiento de stock con ID {id} no fue encontrado.");
        stock.LibroId = dto.LibroId;
        stock.Tipo = dto.Tipo;
        stock.Cantidad = dto.Cantidad;
        stock.Fecha = dto.Fecha;
        await _repository.UpdateAsync(stock);
    }

    public async Task DeleteAsync(int id)
    {
        var stock = await _repository.GetByIdAsync(id);
        if (stock == null) throw new NotFoundException($"El movimiento de stock con ID {id} no fue encontrado.");
        await _repository.DeleteAsync(id);
    }

    private async Task ValidarAsync(StockCreateDto dto)
    {
        var result = await _validator.ValidateAsync(dto);
        if (!result.IsValid)
        {
            var errors = result.Errors
                .GroupBy(e => e.PropertyName)
                .ToDictionary(g => g.Key, g => g.Select(x => x.ErrorMessage).ToArray());
            throw new GestionInventario.Domain.Exceptions.ValidationException(errors);
        }
    }
}
