# User Authentication System - Implementation Document

## Practical 3B: RESTful API with Node.js, Express, MongoDB & Angular Application

---

## Table of Contents
1. [Problem Statement](#problem-statement)
2. [Project Structure](#project-structure)
3. [Backend Implementation](#backend-implementation)
   - [MongoDB Connection](#mongodb-connection)
   - [User Model](#user-model)
   - [API Routes (CRUD Operations)](#api-routes-crud-operations)
4. [Frontend Implementation](#frontend-implementation)
   - [Service Layer](#service-layer)
   - [Components](#components)
   - [Routing](#routing)
5. [How to Run](#how-to-run)
6. [API Documentation](#api-documentation)

---

## Problem Statement

Create four API endpoints using Node.js, Express.js, and MongoDB for CRUD operations. Create an Angular application with:
- User Registration
- User Login
- User Profile (Display User Data)

---

## Project Structure

```
3b/
├── backend/                    # Node.js + Express Backend
│   ├── models/
│   │   └── User.js            # Mongoose User Schema
│   ├── routes/
│   │   └── userRoutes.js      # API Route Handlers
│   ├── server.js              # Express Server Entry Point
│   └── package.json           # Backend Dependencies
│
├── src/                        # Angular Frontend
│   └── app/
│       ├── components/
│       │   ├── login/         # Login Component
│       │   ├── register/      # Register Component
│       │   └── profile/       # Profile Component
│       ├── services/
│       │   └── auth.service.ts # HTTP Service for API calls
│       ├── app.component.ts   # Root Component
│       ├── app.routes.ts      # Route Configuration
│       └── app.config.ts      # App Configuration
│
├── package.json               # Angular Project Dependencies
└── angular.json               # Angular CLI Configuration
```

---

## Backend Implementation

### Technologies Used
- **Express.js**: Web framework for Node.js
- **Mongoose**: ODM library for MongoDB
- **CORS**: Cross-Origin Resource Sharing middleware
- **MongoDB**: NoSQL Database

### server.js (Entry Point)

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
```

**Key Configuration:**
| Component | Value | Purpose |
|-----------|-------|---------|
| Port | 3000 | Server listening port |
| Database | angular_auth_db | MongoDB database name |
| CORS | Enabled | Allows Angular frontend to communicate with backend |

**Middleware Used:**
1. `cors()` - Enables cross-origin requests from Angular
2. `express.json()` - Parses JSON request bodies

---

### User Model (models/User.js)

The Mongoose schema defines the User document structure in MongoDB:

```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true
});
```

**Schema Fields:**
| Field | Type | Validation | Description |
|-------|------|------------|-------------|
| name | String | Required | User's full name |
| email | String | Required, Unique | User's email address |
| password | String | Required | User's password |
| timestamps | Boolean | Auto-created | Created/Updated timestamps |

---

### API Routes (routes/userRoutes.js)

Four CRUD operations implemented as RESTful endpoints:

#### 1. CREATE - Register User
```
POST /api/users/register
```
- Accepts: `name`, `email`, `password`
- Checks for duplicate email
- Creates new user in MongoDB
- Returns: Success message with user data (excluding password)

#### 2. READ - Login User
```
POST /api/users/login
```
- Accepts: `email`, `password`
- Validates credentials against database
- Returns: Success message with user data on valid credentials

#### 3. READ - Get User by ID
```
GET /api/users/:id
```
- Fetches user by MongoDB `_id`
- Returns: Full user data excluding password field

#### 4. UPDATE - Update User
```
PUT /api/users/:id
```
- Accepts: `name`, `email`, `password`
- Updates user document by ID
- Returns: Updated user data

#### 5. DELETE - Delete User
```
DELETE /api/users/:id
```
- Removes user document by ID
- Returns: Success message

---

## Frontend Implementation

### Technologies Used
- **Angular 17**: Frontend framework (Standalone Components)
- **RxJS**: Reactive programming for HTTP calls
- **HttpClient**: Angular service for API communication
- **Angular Router**: Client-side navigation

---

### Service Layer (services/auth.service.ts)

The `AuthService` acts as an intermediary between Angular components and the backend API.

```typescript
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';
  private currentUser: User | null = null;
```

**Methods:**
| Method | Purpose |
|--------|---------|
| `register(user)` | POST to `/register` endpoint |
| `login(email, password)` | POST to `/login` endpoint |
| `setCurrentUser(user)` | Stores user in component state & localStorage |
| `getCurrentUser()` | Retrieves user from storage |
| `logout()` | Clears user session |

**Session Management:**
- User data is stored in `localStorage` under key `'currentUser'`
- This allows user data to persist across page refreshes

---

### Components

#### 1. Register Component (`register.component.ts`)

**Purpose**: User registration form

**Features:**
- Form fields: Name, Email, Password
- Validation: All fields required
- On success: Shows success message, redirects to login after 1 second
- On error: Displays error message

**Flow:**
```
User fills form → Submit → AuthService.register() → 
API POST /api/users/register → Success/Error Response
```

#### 2. Login Component (`login.component.ts`)

**Purpose**: User authentication

**Features:**
- Form fields: Email, Password
- On success: Stores user via `setCurrentUser()`, redirects to profile
- On error: Displays error message

**Flow:**
```
User fills credentials → Submit → AuthService.login() →
API POST /api/users/login → Success/Error Response → 
Store user → Navigate to /profile
```

#### 3. Profile Component (`profile.component.ts`)

**Purpose**: Display authenticated user's data

**Features:**
- Shows user name and email on the page
- Checks for logged-in user on component initialization
- If not logged in: Shows "Login" link
- Logout button: Clears session, redirects to login

**Flow:**
```
Component Loads → OnInit → AuthService.getCurrentUser() →
Display user data OR Show login prompt
```

---

### Routing (app.routes.ts)

```typescript
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent }
];
```

**Route Table:**
| Path | Component | Description |
|------|-----------|-------------|
| `/` | Redirect to `/login` | Default route |
| `/register` | RegisterComponent | Registration form |
| `/login` | LoginComponent | Login form |
| `/profile` | ProfileComponent | User profile display |

---

### App Component (app.component.ts)

The root component provides navigation:

```html
<nav>
  <a routerLink="/register">Register</a>
  <a routerLink="/login">Login</a>
  <a routerLink="/profile">Profile</a>
</nav>
<router-outlet></router-outlet>
```

- `<nav>`: Navigation menu with links to all three routes
- `<router-outlet>`: Displays the active route's component

---

### App Configuration (app.config.ts)

```typescript
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()]
};
```

**Providers:**
- `provideRouter(routes)`: Enables Angular Router
- `provideHttpClient()`: Enables HttpClient for making HTTP requests

---

## How to Run

### Prerequisites
1. MongoDB must be running on `localhost:27017`
2. Node.js and npm installed

### Step 1: Start Backend
```bash
cd backend
npm install
npm start
```
Backend runs on: `http://localhost:3000`

### Step 2: Start Angular Frontend
```bash
npm install
ng serve
```
Frontend runs on: `http://localhost:4200`

### Step 3: Access Application
Open browser: `http://localhost:4200`

---

## API Documentation

### Base URL
```
http://localhost:3000/api/users
```

### Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/register` | Register new user | `{name, email, password}` | User object |
| POST | `/login` | User login | `{email, password}` | User object |
| GET | `/:id` | Get user by ID | - | User object |
| PUT | `/:id` | Update user | `{name, email, password}` | Updated user |
| DELETE | `/:id` | Delete user | - | Success message |

### Sample API Calls

**Register:**
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

---

## Data Flow Diagram

```
┌─────────────────┐     HTTP      ┌──────────────────┐     HTTP      ┌─────────────┐
│   Registration  │──────────────▶│  Express Server  │──────────────▶│   MongoDB   │
│   Component     │               │  (server.js)     │               │ (angular_   │
│                 │◀──────────────│                  │◀──────────────│  auth_db)   │
└─────────────────┘     JSON      └──────────────────┘     JSON       └─────────────┘
        │                        │                        │
        │                        │ Routes                │
        │                        ▼                        │
        │              ┌──────────────────┐               │
        │              │   userRoutes.js  │               │
        │              │                  │               │
        │              │ POST /register   │               │
        │              │ POST /login      │               │
        │              │ GET  /:id        │               │
        │              │ PUT  /:id        │               │
        │              │ DELETE /:id      │               │
        │              └──────────────────┘               │
        │                        │                        │
        │                        ▼                        │
        │              ┌──────────────────┐               │
        │              │    User Model     │               │
        │              │   (Mongoose)      │               │
        │              └──────────────────┘               │
        │                                                  │
        ▼                                                  │
┌─────────────────┐                                        │
│  Login Component│                                        │
│  - Validates    │                                        │
│  - Stores User  │                                        │
└─────────────────┘                                        │
        │                                                  │
        ▼                                                  │
┌─────────────────┐                                        │
│ Profile Component│                                       │
│ - Displays Data │                                        │
│ - Logout Action │                                        │
└─────────────────┘                                        │
```

---

## Architecture Overview

### Three-Tier Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│                        (Angular)                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   Register   │  │    Login    │  │     Profile       │  │
│  │  Component   │  │  Component   │  │    Component     │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
│                            │                                │
│                     AuthService                             │
│              (HTTP Client Wrapper)                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ HTTP REST API
┌─────────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                      │
│                      (Node.js + Express)                     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   API Routes                          │   │
│  │  POST /register  │  POST /login  │  GET/PUT/DELETE    │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                │
│                     Mongoose ODM                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ MongoDB Queries
┌─────────────────────────────────────────────────────────────┐
│                      DATA ACCESS LAYER                       │
│                        (MongoDB)                             │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Database: angular_auth_db                │   │
│  │                                                        │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │            Collection: users                     │  │   │
│  │  │  { name, email, password, createdAt, updatedAt } │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Implementation Details

### 1. CORS Configuration
CORS is enabled on the backend to allow the Angular frontend (running on port 4200) to make API requests to the Express server (running on port 3000).

### 2. Password Storage
**Note**: In this implementation, passwords are stored in plain text. For production applications, passwords should be hashed using bcrypt or similar libraries.

### 3. Session Management
User session is managed using localStorage:
- On successful login: User data stored in localStorage
- On page load: Check localStorage for existing session
- On logout: Remove user data from localStorage

### 4. HTTP Communication
Angular's HttpClient module handles HTTP requests:
- Returns RxJS Observables
- Supports error handling via `.subscribe()` with error callbacks

### 5. Standalone Components
Angular 17 uses standalone components (no NgModules required):
- Each component declares its own imports
- Easier dependency management

---

## Conclusion

This implementation demonstrates a complete full-stack application with:
- **Backend**: Node.js + Express REST API with MongoDB for CRUD operations
- **Frontend**: Angular 17 standalone components with reactive forms and HTTP services
- **Authentication Flow**: Registration → Login → Profile display with session persistence
