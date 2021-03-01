import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { environment } from '@env';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Comment } from '../models/comment.model';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  create(post: Post): Observable<any> {
    return this.httpClient.post<Post>(
      `${environment.apiUrl}/api/post/create`,
      post,
      { observe: 'response' }
    );
  }

  getAll(page: number): Observable<HttpResponse<Post[]>> {
    return this.httpClient.get<Post[]>(
      `${environment.apiUrl}/api/post/comment/?page=` + page,
      { observe: 'response' }
    );
  }

  getSingle(id: any): Observable<any> {
    return this.httpClient.get<Post>(`${environment.apiUrl}/api/post/` + id, {
      observe: 'response'
    });
  }

  delete(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/api/post/` + id);
  }
}
