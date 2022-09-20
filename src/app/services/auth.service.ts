import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { TokenService } from './token.service';

const OAUTH_CLIENT = "742603ef88d1341b5a26eb250121904c";
const OAUTH_SECRET = "ba9fa26873ca3849f1f16924563d8d09f3e06fd32d35d7ca0c436092521b3cab45cb409d7ae711c4d9b2509be879267dda0025c538330691e31a465814bf76c0";
const API = "http://127.0.0.1:8000/";
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    "Content-type": "application/x-www-form-urlencoded",
    Authorization: "Bearer "+ Buffer.from(OAUTH_CLIENT + OAUTH_SECRET, "base64"),
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl = "";

  private static handleError(error: HttpErrorResponse): any{
    if(error.error instanceof ErrorEvent){
      console.error("Doslo je do greske: ", error.error.message);
    }
    else{
      console.error(
        `Server returned: ${error.status}`,
        `body: ${error.error}`
      )
    }
  }

  private static log (message: string):any {
    console.log(message);
  }

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  login(data: any): Observable<any>{
    this.tokenService.removeAccessToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set("email", data.email)
      .set("password", data.password)
      .set("grant_type", "password");

    return this.http.post<any>(API + "token", body, HTTP_OPTIONS).pipe(
      tap(res => {
        this.tokenService.saveAccessToken(res.access_token);
        this.tokenService.saveRefreshToken(res.refresh_token);
      }),
      catchError(AuthService.handleError)
    );
  }

  refreshToken(data: any): Observable<any>{
    this.tokenService.removeAccessToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set("refresh_token", data.refresh_token)
      .set("grant_type", "refresh_token");

    return this.http.post<any>(API + "token", body, HTTP_OPTIONS).pipe(
      tap(res => {
        this.tokenService.saveAccessToken(res.access_token);
        this.tokenService.saveRefreshToken(res.refresh_token);
      }),
      catchError(AuthService.handleError)
    );
  }

  logout(){
    this.tokenService.removeAccessToken();
    this.tokenService.removeRefreshToken();
  }
}
