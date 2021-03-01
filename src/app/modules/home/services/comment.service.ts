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
export class CommentService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  delete(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/api/comment/` + id);
  }
  createComment(comment: Comment): Observable<any> {
    return this.httpClient.post<Post>(
      `${environment.apiUrl}/api/comment/create`,
      comment,
      { observe: 'response' }
    );
  }
}
