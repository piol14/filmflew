import { HttpErrorResponse } from "@angular/common/http";

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

export interface IPage<T> {
    
    content: T[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;

    strSortField: string;
    strSortDirection: string;
    strFilter: string;
    strFilteredTitle: string;
    strFilteredMessage: string;
    nRecords: number;

    error: HttpErrorResponse;
}

export interface IEntity {
    id: number,
}

export interface ICliente extends IEntity {
    nombre: string,
    direccion: string,
    telefono: string,
   
    rol: boolean,
   
}

export interface IClientePage extends IPage<ICliente> {
}

export interface IPelicula extends IEntity {
    director: string,

    duracion: number,
    genero: string, 
    titulo: string
}

export interface IPeliculaPage extends IPage<IPelicula> {
}

export interface IAlquiler extends IEntity {
    fecha_alquiler: string,
    fecha_devolucion: string,
    cliente_id: ICliente,
    pelicula_id: IPelicula
}

export interface IAlquilerPage extends IPage<IAlquiler> {
}

export type formOperation = 'EDIT' | 'NEW';