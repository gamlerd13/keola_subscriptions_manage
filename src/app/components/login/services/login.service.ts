import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environmen';
import { LoginCredentials, LoginResponse } from '../../../../models/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
class AuthService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient,  private router: Router) {}

  public login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials).pipe(
        map(response => {
          if (response && response.access_Token) {
            localStorage.setItem('authToken', response.access_Token);
            return response;
          } else {
            throw new Error('Invalid login response');
          }
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

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    console.log("Authentificado ? : ",!!localStorage.getItem('authToken'));
    return !!localStorage.getItem('authToken');
  }
}

export default AuthService;