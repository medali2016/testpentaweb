import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers.set(
        'Authorization',
        'Bearer ' + localStorage.getItem('jwtToken')
      )
    });
    request = request.clone({
      headers: request.headers.set('Accept-Language', 'fr-FR')
    });
    // request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
    request = request.clone({
      headers: request.headers.set('Access-Control-Allow-Origin', '*')
    });
    if (!request.headers.has('Accept')) {
      request = request.clone({
        headers: request.headers.set('Accept', 'application/json')
      });
    }
    console.log('Accept-Language:' + request.headers.get('Accept-Language'));
    console.log('Accept-Accept:' + request.headers.get('Accept'));
    console.log('Authorization-Accept:' + request.headers.get('Authorization'));
    // request = request.clone({headers: request.headers.set('Accept-Language', 'fr-FR')});

    return next.handle(request);
  }
}
