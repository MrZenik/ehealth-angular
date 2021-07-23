import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PatientComponent} from "./patient/patient.component";
import {CommentUpdatingComponent} from "./comment-updating/comment-updating.component";
import {CommentsComponent} from "./comments/comments.component";
import {NewPatientComponent} from "./new-patient/new-patient.component";
import {PatientsListComponent} from "./patients-list/patients-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'patients', pathMatch: 'full'},
  {path: 'patients', component: PatientsListComponent, children: [
      {path: 'new', component: NewPatientComponent},
      {path: ':id', component: PatientComponent, children: [
          {path: '', redirectTo: 'comments', pathMatch: 'full'},
          {path: 'comments', component: CommentsComponent},
          {path: 'comments/:commentId', component: CommentUpdatingComponent}
        ]}
    ]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
