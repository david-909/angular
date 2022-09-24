import { API } from './../const';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }
  getUser(){
    return this.http.get(API+"api/user")
  }
}
