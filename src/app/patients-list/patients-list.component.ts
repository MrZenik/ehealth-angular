import {Component, OnInit} from '@angular/core';
import {PatientService} from "../patient.service";
import {Patient} from "../patient";
import {Router} from "@angular/router";

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {

  patients: Patient[] = [];

  constructor(private patientService: PatientService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.patientService.getPatients()
      .subscribe(patients => this.patients = patients)
  }

  getPatientById(id: number) {
    this.router.navigateByUrl('/').then(() => {
      this.router.navigate([`/patients/${id}`]);
    });
  }

  newPatient() {
    this.router.navigateByUrl("/patients/new")
  }

  searchPatients(fullName: string) {
    fullName = fullName.trim()
    if (fullName) {
      this.patientService.searchPatient(fullName)
        .subscribe(patients => this.patients = patients)
    }
  }

}
