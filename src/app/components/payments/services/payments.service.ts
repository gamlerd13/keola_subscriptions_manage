import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environmen';


interface Suscription {
    idPayment: number
    idSuscription: number
    quoteDescription: string
    nextExpiration: string
    verif: number
    payDate: string
    verifText: string
    [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
class PaymentDetailService {
  private apiPaymentUrl = `${environment.payment}`;

  constructor(private http: HttpClient) {}

  public getDetailPayment(idPayment: string): Observable<Suscription> {
    return this.http.get<Suscription>(`${this.apiPaymentUrl}${idPayment}`).pipe(
        map((response: any) => {

            console.log(response.objModel);
            return response.objModel;
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

export default PaymentDetailService;