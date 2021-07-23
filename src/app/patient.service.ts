import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {Patient} from "./patient";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private URL = "https://ehealth-back-tz.herokuapp.com/api/patients"

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.URL)
  }

  getPatientById(id: number | string): Observable<Patient> {
    const tempURL = `${this.URL}/${id}`;
    return this.http.get<Patient>(tempURL).pipe(
      catchError((error) => {
        this.router.navigate(["/"])
        return throwError(error)
      })
    );
  }

  searchPatient(fullName: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.URL}?name=${fullName}`)
  }

  createPatient(patient: object): Observable<Patient> {
    return this.http.post<Patient>(this.URL, patient)
  }

  updatePatient(updatedPatient: object, patientId: number): Observable<Patient> {
    return this.http.put<Patient>(`${this.URL}/${patientId}`, updatedPatient)
  }

  deletePatient(patientId: number): Observable<Patient> {
    return this.http.delete<Patient>(`${this.URL}/${patientId}`)
  }

}
