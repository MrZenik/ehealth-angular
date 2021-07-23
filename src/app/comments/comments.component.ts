import {Component, OnInit} from '@angular/core';
import {Comment} from "../comment";
import {CommentService} from "../comment.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: Comment[] = []
  error: string;
  patientId: number;

  constructor(private commentService: CommentService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.route.parent.params.subscribe(params => {
      this.patientId = +params["id"];
    });
    this.getComments()
  }

  getComments() {
    this.commentService.getComments(this.patientId)
      .subscribe(comments => this.comments = comments)
  }

  createComment(commentText: string) {
    commentText = commentText.trim()
    if (!commentText) {
      this.error = "Коментар пустий!"
      setTimeout(() => this.error = "", 5000)
      return
    }
    this.commentService.createComment(this.patientId, commentText)
      .subscribe(comment => {
        this.comments.push(comment)
      })
  }

  updateComment(commentId: number) {
    this.router.navigate([`/patients/${this.patientId}/comments/${commentId}`])
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(this.patientId, id).subscribe(() => {
      this.getComments()
    }, (error) => {
      this.error = "Неможливо видалити коментар!"
      setTimeout(() => this.error = "", 5000)
    })
  }
}
