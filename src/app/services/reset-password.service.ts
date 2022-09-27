import { API } from './../const';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  requestOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    }),
   };
  constructor(private http: HttpClient) { }

  requestReset(data: any){
    const body = new HttpParams().set('email', data.email)
    
    return this.http.post(API + "api/requestpassword", body.toString(), this.requestOptions);
  }

  reset(data: any){
    const body = new HttpParams().set('password', data.password);

    return this.http.post(API + `api/resetpassword?token=${data.token}`, body.toString(), this.requestOptions);
  }
}
