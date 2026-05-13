export interface DashboardDto {
  totalLibros: number;
  totalClientes: number;
  totalVentas: number;
  gananciasTotales: number;
  librosStockCritico: LibroStockCriticoDto[];
}

export interface LibroStockCriticoDto {
  libroId: number;
  titulo: string;
  stockActual: number;
}

export interface AnalisisFinancieroDto {
  labelsMeses: string[];
  gananciasData: number[];
  ventasData: number[];
  topLibrosVendidos: LibroTopVendidoDto[];
}

export interface LibroTopVendidoDto {
  titulo: string;
  cantidadVendida: number;
}
