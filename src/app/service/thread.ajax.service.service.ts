import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPelicula, IPeliculaPage } from '../model/model.interfaces';

@Injectable()
export class ThreadAjaxService {

    sUrl: string = "http://localhost:8083/thread";

    constructor(private oHttpClient: HttpClient) { }

    getOne(id: number): Observable<IPelicula> {
        return this.oHttpClient.get<IPelicula>(this.sUrl + "/" + id);
    }

    createThread(thread: IPelicula): Observable<IPelicula> {
        return this.oHttpClient.post<IPelicula>(this.sUrl, thread);
    }

    updateThread(thread: IPelicula): Observable<IPelicula> {
        return this.oHttpClient.put<IPelicula>(this.sUrl, thread);
    }

    removeOne(id: number): Observable<number> {
        return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
    }
    getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): Observable<IPeliculaPage> {
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<IPeliculaPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
    }
}
