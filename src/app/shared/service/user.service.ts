import { Injectable, ViewChild } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import { Subscription, Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '@shared/models/user.model';
import { environment } from '@env';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export type EntityResponseType = HttpResponse<User>;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  /******************* *******************/
  findByid(id: any): Observable<EntityResponseType> {
    return this.httpClient.get<User>(`${environment.apiUrl}/api/users/` + id, {
      observe: 'response'
    });
  }

  constructor(private httpClient: HttpClient, private router: Router) {}
}
