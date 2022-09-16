import { Router } from '@angular/router';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const url: string = state.url;

      return this.checkLogin(url);
    }
  
    checkLogin(url: string): boolean {
      if (this.tokenService.getAccessToken()){
        return true;
      }
      this.authService.redirectUrl = url;
      this.router.navigate(["/login"]);
    }
}
  

