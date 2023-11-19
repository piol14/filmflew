import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPelicula, IPeliculaPage } from '../model/model.interfaces';

@Injectable()
export class PeliculaAjaxService {

    sUrl: string = "http://localhost:8083/pelicula";

    constructor(private oHttpClient: HttpClient) { }

    getOne(id: number): Observable<IPelicula> {
        return this.oHttpClient.get<IPelicula>(this.sUrl + "/" + id);
    }

    createPelicula(thread: IPelicula): Observable<IPelicula> {
        return this.oHttpClient.post<IPelicula>(this.sUrl, thread);
    }

    updatePelicula(thread: IPelicula): Observable<IPelicula> {
        return this.oHttpClient.put<IPelicula>(this.sUrl, thread);
    }

    removeOne(id: number | undefined): Observable<number> {
        return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
    }
    getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): Observable<IPeliculaPage> {
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<IPeliculaPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
    }
    generateRandom(amount: number): Observable<number> {
        return this.oHttpClient.post<number>(this.sUrl + "/populate/" + amount, null);
    }
}
