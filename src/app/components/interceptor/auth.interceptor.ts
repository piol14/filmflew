import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { SessionAjaxService } from "src/app/service/session.ajax.service.ts.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private oSessionService: SessionAjaxService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (this.oSessionService.isSessionActive()) {
            const token = this.oSessionService.getToken();
            if (token) {
                const cloned = req.clone({
                    headers: req.headers.set("Authorization", "Bearer " + token)
                });
                return next.handle(cloned);
            }
            else {
                return next.handle(req);
            }
        } else {
            return next.handle(req);
        }
        
    }
}