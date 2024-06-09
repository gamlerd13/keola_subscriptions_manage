import { Component } from '@angular/core';
import AuthService  from '../login/services/login.service'
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; //fm

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
