import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // fm
import { ReactiveFormsModule } from '@angular/forms'; //fm
import { CommonModule } from '@angular/common'; //fm
import AuthService from './services/login.service'

import { LoginCredentials, LoginResponse } from '../../../models/login';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} es requerido`;
    } else if (control?.hasError('minlength')) {
      const requiredLength = control.getError('minlength')?.requiredLength;
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} debe ser por lo menos ${requiredLength} caracteres`;
    }
    return '';
  }


  // with rxjs
  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials: LoginCredentials = this.loginForm.value;
      console.log(credentials);
      this.authService.login(credentials).pipe(
        catchError(error => {
          console.error('Login failed:', error);
          return of(null);
        })
      ).subscribe(response => {
        if (response) {
          console.log('Login successful:', response);
          this.router.navigate(['/home']);
        }
      });
    }
  }
}

