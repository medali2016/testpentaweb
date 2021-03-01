import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable()
export class NoAuthGuard implements CanActivate {
  canActivate(): boolean {
    console.log(
      localStorage.getItem('jwtToken') + 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk000'
    );
    if (localStorage.getItem('jwtToken') == null) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
  constructor(private router: Router) {}
  public getToken(): string {
    return localStorage.getItem('accessToken');
  }

  /*public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    return tokenNotExpired(token);
  }*/
}
