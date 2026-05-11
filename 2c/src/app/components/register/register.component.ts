import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <h2>Register</h2>
    <form (ngSubmit)="onSubmit()">
      <div class="error" *ngIf="error">{{ error }}</div>
      <div class="success" *ngIf="success">{{ success }}</div>
      <label>Name</label>
      <input type="text" [(ngModel)]="name" name="name" required />
      <label>Email</label>
      <input type="email" [(ngModel)]="email" name="email" required />
      <label>Password</label>
      <input type="password" [(ngModel)]="password" name="password" required />
      <button type="submit">Register</button>
    </form>
  `
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  error = '';
  success = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.error = '';
    this.success = '';
    const user: User = { name: this.name, email: this.email, password: this.password };
    if (this.authService.register(user)) {
      this.success = 'Registration successful!';
      setTimeout(() => this.router.navigate(['/login']), 1000);
    } else {
      this.error = 'Email already exists.';
    }
  }
}
