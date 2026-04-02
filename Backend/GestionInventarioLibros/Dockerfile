# Usamos la imagen oficial de .NET 8 SDK para compilar
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiamos los archivos de proyecto para restaurar dependencias
COPY ["GestionInventarioLibros/GestionInventarioLibros.csproj", "GestionInventarioLibros/"]
COPY ["GestionInventario.Application/GestionInventario.Application.csproj", "GestionInventario.Application/"]
COPY ["GestionInventario.Domain/GestionInventario.Domain.csproj", "GestionInventario.Domain/"]
COPY ["GestionInventario.Infrastructure/GestionInventario.Infrastructure.csproj", "GestionInventario.Infrastructure/"]

# Restauramos las dependencias
RUN dotnet restore "GestionInventarioLibros/GestionInventarioLibros.csproj"

# Copiamos todo el código y compilamos
COPY . .
WORKDIR "/src/GestionInventarioLibros"
RUN dotnet build "GestionInventarioLibros.csproj" -c Release -o /app/build

# Publicamos la aplicación
FROM build AS publish
RUN dotnet publish "GestionInventarioLibros.csproj" -c Release -o /app/publish

# Imagen final de ejecución (más ligera)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
# .NET 8 escucha en el puerto 8080 por defecto en contenedores
EXPOSE 8080
ENTRYPOINT ["dotnet", "GestionInventarioLibros.dll"]
