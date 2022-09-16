import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TokenService } from "./services/token.service";
import { AuthService } from "./services/auth.service";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { catchError, map, throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor (private router: Router, private tokenService: TokenService, private authService: AuthService){

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): any {
        const accessToken = this.tokenService.getAccessToken();
        const refreshToken = this.tokenService.getRefreshToken();

        if(accessToken){
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + accessToken
                }
            });
        }

        if(!request.headers.has("Content-type")){
            request = request.clone({
                setHeaders: {
                    'Content-type': 'application/json'
                }
            });
        }

        request = request.clone({
            headers: request.headers.set("Accept", "application/json")
        });

        return next.handle(request).pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse){
              console.log(event);
            }
            return event;
          }),
          catchError((error: HttpErrorResponse) => {
            if(error.status == 401) {
              if(error.error.error === "invalid_token"){
                this.authService.refreshToken({refresh_token: refreshToken}).subscribe(() => {
                  location.reload();
                })
              } 
              else{
                this.router.navigate(["login"]);
              }
            }
            return throwError(()=> new Error(error.error.error));
          })
        )
    }
}