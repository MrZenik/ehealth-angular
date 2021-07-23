import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Patient} from "../patient";
import {PatientService} from "../patient.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patient: Patient;
  error = "";
  updating: boolean = false;
  updatedPatient: FormGroup;

  constructor(private route: ActivatedRoute,
              private patientService: PatientService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.getPatient();
  }

  ngOnInit(): void {
  }

  getPatient() {
    // @ts-ignore
    let id = +this.route.snapshot.paramMap.get('id')
    this.patientService.getPatientById(id)
      .subscribe((patient) => {
        this.patient = patient
        this.updatedPatient = this.formBuilder.group({
          fullName: patient.fullName,
          birthday: patient.birthday,
          sex: patient.sex,
          country: patient.country,
          state: patient.state,
          address: patient.address
        })
      })
  }

  deletePatient(patientId: number) {
    this.patientService.deletePatient(patientId)
      .subscribe(() => {
        this.router.navigateByUrl('/pat', {skipLocationChange: true}).then(() => {
          this.router.navigate(["/patients/"]);
        });
      }, () => {
        this.error = "Неможливо видалити пацієнта!"
        setTimeout(() => this.error = "", 5000)
      })
  }

  updatePatient() {
    this.updating = true;
  }

  cancelUpdating() {
    this.updating = false;
    this.getPatient()
  }

  confirmUpdating(updatedPatient: object) {
    const isEmpty = !Object.values(updatedPatient).every(x => (x.trim() !== ''));
    if (isEmpty) {
      this.error = "Заповніть всі поля!"
      setTimeout(() => this.error = "", 5000)
      return
    }
    this.patientService.updatePatient(updatedPatient, this.patient.id)
      .subscribe(() => {
        this.updating = false
        this.getPatient()
        this.router.navigateByUrl('/pat', { skipLocationChange: true }).then(() => {
          this.router.navigate(["/patients/"+this.patient.id]);
        });
      })
  }

}
