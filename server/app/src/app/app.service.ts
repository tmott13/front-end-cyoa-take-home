import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IComment } from './models/comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  rootURL = 'http://localhost:3080';

  getComments(): Observable<IComment[]> {
    return this.http.get<IComment[]>(this.rootURL + '/getComments');
  }

  getSingleComment(id: number): Observable<IComment> {
    return this.http.get<IComment>(this.rootURL + '/getComment');
  }

  addComment(comment: IComment): Observable<IComment> {
    return this.http.post<IComment>(this.rootURL + '/createComment', {
      comment,
    });
  }

  deleteComments(): Observable<IComment[]> {
    return this.http.delete<IComment[]>(this.rootURL + '/deleteComments');
  }
}
