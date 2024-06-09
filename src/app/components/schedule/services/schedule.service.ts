import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environmen';
import { Payments } from '../../../../models/payments'


@Injectable({
  providedIn: 'root'
})
class ScheduleService {
  private apiPaymentsUrl = `${environment.schedule}`;
  // private apiPaymentsUrl = 'assets/data.json';

  constructor(private http: HttpClient) {}

  public getListSchedule(idSubscription: string): Observable<Payments[]> {
    return this.http.get<Payments>(`${this.apiPaymentsUrl}${idSubscription}/1`).pipe(
        map((response: any) => {
            
            console.log(response.objModel);
            return response.objModel; // Aquí simplemente devolvemos la respuesta sin manipulación
          }),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        return throwError(
          'Something bad happened; please try again later.');
      })
    );
  }
}

export default ScheduleService;