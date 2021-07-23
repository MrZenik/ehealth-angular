import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommentService} from "../comment.service";
import {Comment} from "../comment";

@Component({
  selector: 'app-comment-updating',
  templateUrl: './comment-updating.component.html',
  styleUrls: ['./comment-updating.component.css']
})
export class CommentUpdatingComponent implements OnInit {
  patientId: number;
  commentId: number;
  comment: Comment;
  error: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private commentService: CommentService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.route.parent.params.subscribe(params => {
      this.patientId = +params["id"];
    });

    // @ts-ignore
    this.route.params.subscribe(params => {
      this.commentId = +params["commentId"];
    });

    this.commentService.getCommentById(this.commentId, this.patientId)
      .subscribe(comment => this.comment = comment)

  }

  cancel() {
    this.router.navigate(["/patients/" + this.patientId])
  }

  confirm(newCommentText: string) {
    newCommentText = newCommentText.trim()
    if (!newCommentText) {
      this.error = "Коментар пустий!"
      setTimeout(() => this.error = "", 5000)
      return
    }
    this.comment.comment = newCommentText;
    this.commentService.updateComment(this.comment)
      .subscribe(() => {}, (error) => {
        this.error = "Щось пішло не так :(!"
        setTimeout(() => this.error = "", 5000)
      })
    this.router.navigate(["/patients/" + this.patientId])
  }
}
