import { Injectable } from '@angular/core';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  getRefreshToken(){
    return localStorage.getItem(REFRESH_TOKEN);
  }

  saveAccessToken(token: string) : void{
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  saveRefreshToken(refreshToken: string) : void{
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  removeAccessToken() : void{
    localStorage.removeItem(ACCESS_TOKEN);
  }

  removeRefreshToken() : void{
    localStorage.removeItem(REFRESH_TOKEN);
  }
}
