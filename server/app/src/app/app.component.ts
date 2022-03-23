import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { AppService } from './app.service';
import { IComment } from './models/comment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  commentForm = new FormGroup({
    name: new FormControl(''),
    comment: new FormControl(''),
  });
  commentList: IComment[] = [];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.appService.getComments().subscribe(
      (comments) => {
        this.commentList = comments;
        this.commentList.forEach((c) => {
          c.created = moment(c.created).format('LLLL');
        });
      },
      (err) => {
        console.log('Error caught in getComments() subscribe :' + err);
      }
    );
  }

  deleteComments() {
    this.appService.deleteComments().subscribe(
      () => {
        this.getComments();
      },
      (err) => {
        console.log('Error caught in deleteComments() subscribe :' + err);
      }
    );
  }

  submit() {
    const request: IComment = {
      name: this.commentForm.get('name').value,
      created: moment().format(),
      message: this.commentForm.get('comment').value,
    };
    console.log(request);
    this.appService.addComment(request).subscribe(
      (x) => {
        console.log(x);
        this.commentForm.reset();
        this.getComments();
      },
      (err) => {
        console.log('Error caught in submit() subscribe :' + err);
      }
    );
  }
}
