import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAlquiler, IAlquilerPage } from '../model/model.interfaces';

@Injectable()
export class ReplyAjaxService {

    sUrl: string = "http://localhost:8083/reply";

    constructor(private oHttpClient: HttpClient) { }

    getOne(id: number): Observable<IAlquiler> {
        return this.oHttpClient.get<IAlquiler>(this.sUrl + "/" + id);
    }

    createReply(reply: IAlquiler): Observable<IAlquiler> {
        return this.oHttpClient.post<IAlquiler>(this.sUrl, reply);
    }

    updateReply(reply: IAlquiler): Observable<IAlquiler> {
        return this.oHttpClient.put<IAlquiler>(this.sUrl, reply);
    }

    removeOne(id: number): Observable<number> {
        return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
    }
    getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): Observable<IAlquilerPage> {
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<IAlquilerPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
    }
      
}
