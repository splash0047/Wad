import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="onSubmit()">
      <div class="error" *ngIf="error">{{ error }}</div>
      <label>Email</label>
      <input type="email" [(ngModel)]="email" name="email" required />
      <label>Password</label>
      <input type="password" [(ngModel)]="password" name="password" required />
      <button type="submit">Login</button>
    </form>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.error = '';
    if (this.authService.login(this.email, this.password)) {
      this.router.navigate(['/profile']);
    } else {
      this.error = 'Invalid email or password.';
    }
  }
}
