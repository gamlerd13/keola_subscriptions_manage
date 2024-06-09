import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environmen';


interface Suscription {
    id: number,
    idUser: number
    package: {}
    packageDetailResponse: {}
    [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
class SuscriptionDetailService {
  private apiSuscriptionUrl = `${environment.subscriptionDetail}`;

  constructor(private http: HttpClient) {}

  public getDetailSubscription(idSubscription: string): Observable<Suscription[]> {
    return this.http.get<Suscription>(`${this.apiSuscriptionUrl}${idSubscription}`).pipe(
        map((response: any) => {

            console.log(response);
            return response;
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

export default SuscriptionDetailService;