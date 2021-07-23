import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PatientComponent } from './patient/patient.component';
import { CommentsComponent } from './comments/comments.component';
import { ExceptionComponent } from './exception/exception.component';
import { CommentUpdatingComponent } from './comment-updating/comment-updating.component';
import { NewPatientComponent } from './new-patient/new-patient.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    PatientsListComponent,
    PatientComponent,
    CommentsComponent,
    ExceptionComponent,
    CommentUpdatingComponent,
    NewPatientComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
