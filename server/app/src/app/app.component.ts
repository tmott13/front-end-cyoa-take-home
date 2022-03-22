import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from './app.service';
import { IComment } from './models/comment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  commentForm = new FormGroup({
    name: new FormControl(""),
    comment: new FormControl("")
  });
  commentList: IComment[] = [];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.appService.getComments().subscribe((comments) => {
        this.commentList = comments;
    });
  }

  submit() {
    const request: IComment = {
      name: this.commentForm.get("name").value,
      created: new Date,
      message: this.commentForm.get("comment").value
    };
    console.log(request);
    this.appService.addComment(request).subscribe((x) => {
      console.log(x);
      this.commentForm.reset();
      this.getComments();
    });
  }
}
