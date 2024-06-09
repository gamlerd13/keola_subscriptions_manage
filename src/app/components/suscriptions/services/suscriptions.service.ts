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
class SuscriptionService {
  private apiSuscriptionUrl = `${environment.subscription}`;

  constructor(private http: HttpClient) {}

  public getSubscription(idUser: number): Observable<Suscription[]> {
    return this.http.get<Suscription[]>(`${this.apiSuscriptionUrl}${idUser}`).pipe(
        map((response: any) => {

            console.log(response.objModel.suscriptions);
            return response.objModel.suscriptions;
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

export default SuscriptionService;