export interface VentaDto {
  id: number;
  libroId: number;
  clienteId: number;
  fechaVenta: string;
  cantidad: number;
  total: number;
}

export interface VentaCreateDto {
  libroId: number;
  clienteId: number;
  fechaVenta: string;
  cantidad: number;
  total: number;
}

export interface ClienteDto {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
}

export interface ClienteCreateDto {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
}

export interface PrestamoDto {
  id: number;
  libroId: number;
  clienteId: number;
  fechaPrestamo: string;
  fechaDevolucion?: string;
}

export interface PrestamoCreateDto {
  libroId: number;
  clienteId: number;
  fechaPrestamo: string;
  fechaDevolucion?: string;
}

export interface StockDto {
  id: number;
  libroId: number;
  tipo: number; // 0 = Entrada, 1 = Salida
  cantidad: number;
  fecha: string;
}

export interface StockCreateDto {
  libroId: number;
  tipo: number;
  cantidad: number;
  fecha: string;
}
