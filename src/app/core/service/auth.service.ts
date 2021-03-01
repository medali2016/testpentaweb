import { Injectable } from '@angular/core';
import { of, Observable, throwError, BehaviorSubject } from 'rxjs';

import { User } from '@shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '@env';
interface LoginContextInterface {
  username: string;
  password: string;
  token: string;
}

const defaultUser = {
  username: 'Mathis',
  password: '12345',
  token: '12345'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  private currentUserSubject: BehaviorSubject<User>;
  private checkLoginSubject: BehaviorSubject<Boolean>;
  public isLogin: Observable<Boolean>;
  public currentUser: Observable<User>;
  public isAdmin: Observable<Boolean>;
  private checkAdminSubject: BehaviorSubject<Boolean>;
  constructor(
    private http: HttpClient,
    private router: Router,
    private httpClient: HttpClient
  ) {
    /*this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.checkLoginSubject = new BehaviorSubject<Boolean>(false);
    this.checkAdminSubject = new BehaviorSubject<Boolean>(false);
    this.isLogin = this.checkLoginSubject.asObservable();
    this.isAdmin = this.checkAdminSubject.asObservable();*/
  }

  login(username: string, password: string) {
    console.log('done');
    return this.http
      .post<any>(`${environment.apiUrl}/api/auth/signin`, {
        email: username,
        password: password
      })
      .pipe(
        map(
          data => {
            if (data) {
              localStorage.setItem('jwtToken', data.jwtToken);
              localStorage.setItem('currentUser', JSON.stringify(data.user));
              localStorage.setItem('userId', data.user.id);
              localStorage.setItem('isLogin', 'true');
            }
          },
          error => {
            console.log('error http');
            return throwError('Invalid username or password');
          }
        )
      );
  }
  create(user: User): Observable<any> {
    console.log(user);
    return this.httpClient.post<User>(
      `${environment.apiUrl}/api/auth/signup`,
      user,
      { observe: 'response' }
    );
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/auth/login']);
    return of(false);
  }

  getToken() {
    return this.getToken;
  }
}
