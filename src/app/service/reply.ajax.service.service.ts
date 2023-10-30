import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReply, IReplyPage } from '../model/model.interfaces';

@Injectable()
export class ReplyAjaxService {

    sUrl: string = "http://localhost:8083/reply";

    constructor(private oHttpClient: HttpClient) { }

    getOne(id: number): Observable<IReply> {
        return this.oHttpClient.get<IReply>(this.sUrl + "/" + id);
    }

    createReply(reply: IReply): Observable<IReply> {
        return this.oHttpClient.post<IReply>(this.sUrl, reply);
    }

    updateReply(reply: IReply): Observable<IReply> {
        return this.oHttpClient.put<IReply>(this.sUrl, reply);
    }

    removeOne(id: number): Observable<number> {
        return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
    }
    getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): Observable<IReplyPage> {
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<IReplyPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
    }
      
}
