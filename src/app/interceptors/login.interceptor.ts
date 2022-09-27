import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {
  static accessToken: any = '';
  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${LoginInterceptor.accessToken}`
      },
    });
    return next.handle(req).pipe(catchError((error)=>{
      if(error.status == 401){
        this.router.navigate(["/login"]);
      }
      return throwError(() => error);
    }));
  }
}
