using AutoMapper;
using GestionInventario.Application.DTOs;
using GestionInventario.Domain.Entities;

namespace GestionInventario.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Libro, LibroDto>();
        CreateMap<Autor, AutorDto>();
        CreateMap<Categoria, CategoriaDto>();
        CreateMap<Cliente, ClienteDto>();
        CreateMap<Venta, VentaDto>();
        CreateMap<Prestamo, PrestamoDto>();
        CreateMap<Stock, StockDto>();
    }
}
