import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../const';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }
  
  login(data: User){
    const body = new HttpParams().set('email', data.email)
                .set('password', data.password)
    return this.http.post(API + "api/register", body.toString(), {headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    }), responseType: "text"});
  }
}
