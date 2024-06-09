import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environmen';
import { PaymentValidation, ValidatePaymentResponse } from '../../../../models/payments'

@Injectable({
  providedIn: 'root'
})
class ValidatePaymentService {
  private paymenValidatetUrl = `${environment.validate}`;

  constructor(private http: HttpClient) {}

  public validate(paymentsParams: PaymentValidation): Observable<ValidatePaymentResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ValidatePaymentResponse>(this.paymenValidatetUrl, paymentsParams, { headers }).pipe(
      map(response => {
        console.log('Response:', response);
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.error) {
          console.error('Ocurrió un error:', error.error.description);
          return of(error.error as ValidatePaymentResponse);
        } else {
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`
          );
        }
        return throwError('Something bad happened; please try again later.');
      })
    );
  }
}

export default ValidatePaymentService