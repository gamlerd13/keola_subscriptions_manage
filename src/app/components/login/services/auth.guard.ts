import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import AuthService from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = (route, state) => {
    if (this.authService.isAuthenticated()) {
    
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}