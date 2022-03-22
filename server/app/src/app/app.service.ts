import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IComment } from './models/comment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  rootURL = 'http://localhost:3080';

  getComments() {
    return this.http.get(this.rootURL + '/getComments');
  }

  getSingleComment(id: number) {
    return this.http.get(this.rootURL + '/getComment');
  }

  addComment(comment: IComment) {
    return this.http.post(this.rootURL + '/createComment', {comment});
  }

  deleteComments() {
    return this.http.delete(this.rootURL + '/deleteComments');
  }
}
