import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Comment} from "./comment";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private URL = "https://ehealth-back-tz.herokuapp.com/api/medical-records"

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getComments(patientId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.URL}?patientId=${patientId}`)
  }

  getCommentById(id: number, patientId: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.URL}/${id}?patientId=${patientId}`).pipe(
      catchError((error) => {
        this.router.navigate([`/patients/${patientId}`])
        return throwError(error)
      }))
  }

  createComment(patientId: number, comment: string): Observable<Comment> {
    const medicalRecord = {
      "patientId": patientId,
      "comment": comment
    }
    return this.http.post<Comment>(this.URL, medicalRecord)
  }

  updateComment(comment: Comment) {
    const updatedComment = {
      "patientId": comment.patientId,
      "comment": comment.comment
    }
    return this.http.put<Comment>(`${this.URL}/${comment.id}`, updatedComment)
  }

  deleteComment(patientId: number, id: number): Observable<Comment> {
    return this.http.delete<Comment>(`${this.URL}/${id}?patientId=${patientId}`)
  }

}
