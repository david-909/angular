import { API } from './../const';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  constructor(private http: HttpClient) { }
  getUser(){
    return this.http.get(API+"api/user", {observe: 'response'})
  }

  update(data: any){
    const body = new HttpParams().set("name", data.name)
                                .set("surname", data.surname)
    return this.http.put(API + "api/edit", body.toString(), {headers: new HttpHeaders({
      'Content-type': 'application/x-www-urlencoded'
    }), responseType: 'text'});
  }
}
