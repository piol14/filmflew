import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICliente, IClientePage } from '../model/model.interfaces';

@Injectable()
export class ClienteAjaxService {

    sUrl: string = "http://localhost:8083/cliente";

    constructor(
        private oHttpClient: HttpClient
    ) { }
    createCliente(reply: ICliente): Observable<ICliente> {
        return this.oHttpClient.post<ICliente>(this.sUrl, reply);
    }

    updateCliente(reply: ICliente): Observable<ICliente> {
        return this.oHttpClient.put<ICliente>(this.sUrl, reply);
    }

    getOne(id: number): Observable<ICliente> {
        return this.oHttpClient.get<ICliente>(this.sUrl + "/" + id);
    }

    getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): Observable<IClientePage> {
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<IClientePage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
    }

    removeOne(id: number | undefined): Observable<number> {
        if (id) {
            return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
        } else {            
            return new Observable<number>();
        }
    }
}
