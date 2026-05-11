import { Injectable } from '@angular/core';

export interface User {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private currentUser: User | null = null;

  register(user: User): boolean {
    const exists = this.users.find(u => u.email === user.email);
    if (exists) {
      return false;
    }
    this.users.push(user);
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
  }
}
