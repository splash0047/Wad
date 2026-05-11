# Angular Authentication Application - Implementation Documentation

## Overview

This is a complete Angular 17+ standalone application that implements user authentication with three main features: User Registration, User Login, and Profile Display. The application uses modern Angular practices including standalone components, routing, and dependency injection.

---

## Project Structure

```
2c/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── register/
│   │   │   │   └── register.component.ts
│   │   │   ├── login/
│   │   │   │   └── login.component.ts
│   │   │   └── profile/
│   │   │       └── profile.component.ts
│   │   ├── services/
│   │   │   └── auth.service.ts
│   │   ├── app.component.ts
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   ├── main.ts
│   ├── index.html
│   └── styles.css
├── angular.json
├── package.json
└── tsconfig.json
```

---

## Technology Stack

- **Framework**: Angular 17+ (Standalone Components)
- **Language**: TypeScript
- **Routing**: Angular Router
- **Forms**: Angular FormsModule (Template-driven forms)
- **Build Tool**: Vite (via Angular CLI)

---

## Feature 1: User Registration

### File: `src/app/components/register/register.component.ts`

### Implementation Details:

**Purpose**: Allows new users to create an account by providing their name, email, and password.

**Component Structure**:
- Standalone component (no NgModule required)
- Uses `FormsModule` for two-way data binding with `[(ngModel)]`
- In-line template with HTML form
- Imports: `FormsModule`, `CommonModule`

**Form Fields**:
| Field | Type | Validation |
|-------|------|-------------|
| Name | text | required |
| Email | email | required |
| Password | password | required |

**Functionality**:
1. User enters name, email, and password
2. On form submission, calls `authService.register(user)`
3. If email already exists, displays error message
4. If registration successful, displays success message and redirects to login page after 1 second

**Key Code**:
```typescript
onSubmit(): void {
  const user: User = { name: this.name, email: this.email, password: this.password };
  if (this.authService.register(user)) {
    this.success = 'Registration successful!';
    setTimeout(() => this.router.navigate(['/login']), 1000);
  } else {
    this.error = 'Email already exists.';
  }
}
```

---

## Feature 2: User Login

### File: `src/app/components/login/login.component.ts`

### Implementation Details:

**Purpose**: Authenticates registered users and grants access to the profile page.

**Component Structure**:
- Standalone component
- Uses `FormsModule` for form handling
- In-line template with HTML form
- Imports: `FormsModule`, `CommonModule`

**Form Fields**:
| Field | Type | Validation |
|-------|------|-------------|
| Email | email | required |
| Password | password | required |

**Functionality**:
1. User enters email and password
2. On form submission, calls `authService.login(email, password)`
3. If credentials are valid, redirects to Profile page
4. If credentials are invalid, displays error message

**Key Code**:
```typescript
onSubmit(): void {
  if (this.authService.login(this.email, this.password)) {
    this.router.navigate(['/profile']);
  } else {
    this.error = 'Invalid email or password.';
  }
}
```

---

## Feature 3: User Profile Display

### File: `src/app/components/profile/profile.component.ts`

### Implementation Details:

**Purpose**: Displays the logged-in user's information and provides logout functionality.

**Component Structure**:
- Standalone component
- Implements `OnInit` lifecycle hook
- Uses `CommonModule` for structural directives
- In-line template with conditional rendering

**Functionality**:
1. On component initialization (`ngOnInit`), retrieves current user from AuthService
2. If user is logged in, displays name and email
3. If user is not logged in, shows a message with login link
4. Logout button clears the session and redirects to login page

**Key Code**:
```typescript
ngOnInit(): void {
  this.user = this.authService.getCurrentUser();
}

logout(): void {
  this.authService.logout();
  this.router.navigate(['/login']);
}
```

---

## Authentication Service

### File: `src/app/services/auth.service.ts`

### Implementation Details:

**Purpose**: Centralized service that manages user registration, login, and session state using dependency injection.

**Service Features**:
- `@Injectable({ providedIn: 'root' })` - Root-level singleton service
- Uses in-memory array to store registered users
- Maintains current logged-in user state

**Methods**:

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `register(user)` | `User` object | `boolean` | Adds new user if email doesn't exist |
| `login(email, password)` | `email`, `password` | `boolean` | Validates credentials and sets current user |
| `getCurrentUser()` | none | `User \| null` | Returns currently logged-in user |
| `logout()` | none | `void` | Clears current user session |

**User Interface**:
```typescript
export interface User {
  name: string;
  email: string;
  password: string;
}
```

**Key Implementation**:
```typescript
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
```

---

## Routing Configuration

### File: `src/app/app.routes.ts`

### Implementation Details:

**Purpose**: Defines navigation paths for the application.

**Routes**:

| Path | Component | Description |
|------|------------|-------------|
| `''` | - | Redirects to `/login` |
| `register` | `RegisterComponent` | Registration page |
| `login` | `LoginComponent` | Login page |
| `profile` | `ProfileComponent` | User profile page |

**Code**:
```typescript
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent }
];
```

---

## Application Configuration

### File: `src/app/app.config.ts`

### Implementation Details:

**Purpose**: Provides application-level configuration including routing.

**Configuration**:
```typescript
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
```

---

## Root Component

### File: `src/app/app.component.ts`

### Implementation Details:

**Purpose**: Main application component that provides navigation menu and router outlet.

**Features**:
- Navigation bar with links to Register, Login, and Profile
- Router outlet for displaying routed components

**Template**:
```html
<nav>
  <a routerLink="/register">Register</a>
  <a routerLink="/login">Login</a>
  <a routerLink="/profile">Profile</a>
</nav>
<router-outlet></router-outlet>
```

---

## Application Bootstrap

### File: `src/main.ts`

### Implementation Details:

**Purpose**: Entry point that bootstraps the Angular application.

**Code**:
```typescript
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

---

## Styles

### File: `src/styles.css`

### Implementation Details:

**Global CSS styles**:
- Body: Arial font, light gray background
- Navigation: Blue links with no underline
- Forms: White background, padding, rounded corners
- Buttons: Blue background, white text, hover effect
- Error messages: Red color
- Success messages: Green color

---

## Angular Concepts Used

1. **Standalone Components**: All components use `standalone: true` (no NgModules)
2. **Dependency Injection**: `AuthService` injected via constructor
3. **Routing**: Angular Router with route configuration
4. **Forms**: Template-driven forms with `FormsModule`
5. **Data Binding**: Property binding and event binding
6. **Directives**: `*ngIf`, `routerLink`, `routerLinkActive`
7. **Lifecycle Hooks**: `OnInit` for initialization logic
8. **Services**: Singleton service for state management

---

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   ng serve
   ```

3. Open browser at `http://localhost:4200`

---

## User Flow

1. **Registration Flow**:
   - User visits `/register`
   - Fills in name, email, password
   - Clicks Register button
   - If successful, redirected to `/login` after 1 second

2. **Login Flow**:
   - User visits `/login`
   - Enters email and password
   - Clicks Login button
   - If valid, redirected to `/profile`

3. **Profile Flow**:
   - User visits `/profile`
   - Sees their name and email
   - Can click Logout to end session

---

## Notes

- User data is stored in memory (not persistent - data is lost on page refresh)
- This is a demonstration implementation for educational purposes
- In production, consider using backend API, JWT tokens, and localStorage/sessionStorage