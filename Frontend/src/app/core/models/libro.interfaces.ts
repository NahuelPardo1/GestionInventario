export interface LibroDto {
  id: number;
  titulo: string;
  autorId: number;
  precio: number;
  fechaPublicacion?: string;
  imagenURL?: string;
  categoriaId: number;
}

export interface LibroCreateDto {
  titulo: string;
  autorId: number;
  precio: number;
  fechaPublicacion?: string;
  imagenURL?: string;
  categoriaId?: number;
}

export interface AutorDto {
  id: number;
  nombre: string;
  nacionalidad: string;
  fechaNacimiento: string;
  biografia: string;
}

export interface AutorCreateDto {
  nombre: string;
  nacionalidad: string;
  fechaNacimiento: string;
  biografia: string;
}

export interface CategoriaDto {
  id: number;
  nombre: string;
}

export interface CategoriaCreateDto {
  nombre: string;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
