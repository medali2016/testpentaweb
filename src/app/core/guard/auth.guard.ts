import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk000');
    return true;
  }
}
