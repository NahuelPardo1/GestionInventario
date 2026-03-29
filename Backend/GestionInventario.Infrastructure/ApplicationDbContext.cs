using Microsoft.EntityFrameworkCore;
using GestionInventario.Domain.Entities;

namespace GestionInventario.Infrastructure;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    public DbSet<Libro> Libros { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
}