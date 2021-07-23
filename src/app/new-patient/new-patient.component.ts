import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder} from '@angular/forms';
import {PatientService} from "../patient.service";

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css']
})
export class NewPatientComponent implements OnInit {

  patient;
  error: string;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private patientService: PatientService) {
    this.patient = this.formBuilder.group({
      fullName: "",
      birthday: "",
      sex: "",
      country: "",
      state: "",
      address: ""
    })
  }

  ngOnInit(): void {
  }

  cancel() {
    this.router.navigate(["/"])
  }

  submit(patient: object) {
    const isEmpty = !Object.values(patient).every(x => (x.trim() !== ''));
    if (isEmpty) {
      this.error = "Заповніть всі поля!"
      setTimeout(() => this.error = "", 5000)
      return
    }
    this.patientService.createPatient(patient)
      .subscribe((newPatient) => {
        this.router.navigateByUrl('/pat', { skipLocationChange: true }).then(() => {
          this.router.navigate(["/patients/"+newPatient.id]);
        });
      })
  }

}
