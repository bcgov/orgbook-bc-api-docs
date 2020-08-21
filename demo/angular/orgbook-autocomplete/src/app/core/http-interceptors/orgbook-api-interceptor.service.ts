import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';

@Injectable()
export class OrgbookApiInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const orgbookApiReq = req.clone({
      url: env.apiUrl + req.url.replace(env.apiUrl, '')
    });

    return next.handle(orgbookApiReq);
  }
}
