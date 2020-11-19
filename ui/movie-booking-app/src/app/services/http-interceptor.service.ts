import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor( private authService: AuthService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let newHeader = req.headers;
    if (token) {
      newHeader = newHeader.append('Authorization', `Bearer ${token}`)
    }
    const authReq = req.clone({headers: newHeader});
    return next.handle(authReq);
  }
}
