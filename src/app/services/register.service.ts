import { Observable } from 'rxjs';
import { User } from './../interfaces/user';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../const';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  constructor(private http: HttpClient) { }

  register(data: User){
    const body = new HttpParams().set('email', data.email)
                .set('password', data.password)
                .set('name', data.name)
                .set('surname', data.surname);
    return this.http.post(API + "api/register", body.toString(), {headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    }), responseType: "text"});
  }
}
