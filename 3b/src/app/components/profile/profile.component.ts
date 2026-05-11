import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h2>Profile</h2>
    <div *ngIf="user; else notLoggedIn">
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <button (click)="logout()">Logout</button>
    </div>
    <ng-template #notLoggedIn>
      <p>You are not logged in. <a routerLink="/login">Login</a></p>
    </ng-template>
  `
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
