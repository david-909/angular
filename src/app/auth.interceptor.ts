import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TokenService } from "./services/token.service";
import { AuthService } from "./services/auth.service.spec";
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

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
            headers: request.headers.set("Accept", "application/json");
        })

        return next.handle(request).pipe(

        )
    }
}