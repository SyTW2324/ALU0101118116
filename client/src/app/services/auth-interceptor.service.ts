import { inject, Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpInterceptorFn,
    HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const token = inject(AuthService).getToken();
    let authReq = req;

    if (token)
        authReq = req.clone({
            setHeaders: { Authorization: 'Bearer ' + token },
        });
    return next(authReq);
};
