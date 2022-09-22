import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../const';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }
  
  login(data: any){
    const body = new HttpParams().set('username', data.email)
                .set('password', data.password)
                .set('grant_type', 'password')
                .set('client_id', '742603ef88d1341b5a26eb250121904c')
                .set('client_secret', 'ba9fa26873ca3849f1f16924563d8d09f3e06fd32d35d7ca0c436092521b3cab45cb409d7ae711c4d9b2509be879267dda0025c538330691e31a465814bf76c0');
    return this.http.post(API + "token", body.toString(), {headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    }), withCredentials: true});
  }
}
