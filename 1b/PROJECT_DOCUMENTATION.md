# User Registration System - Project Documentation

## 1. Project Overview

This project implements a user registration system that captures user data through a form, stores it in local storage, and displays registered users in a separate page using AJAX POST method.

## 2. Project Structure

| File | Purpose |
|------|---------|
| `index.html` | Registration form page (input form) |
| `users.html` | Display page showing all registered users |
| `script.js` | Handles form submission, AJAX POST, and localStorage operations |
| `users.js` | Fetches and displays user data from localStorage |
| `style.css` | Styling for the registration form |

## 3. Implementation Details

### 3.1 Registration Page (`index.html`)

- Contains a Bootstrap-styled registration form with fields:
  - Name (text input)
  - Email (email input)
  - Password (password input)
  - Mobile Number (text input)
- Form includes validation (required attributes)
- "View Registered Users" button navigates to `users.html`

### 3.2 Form Handling (`script.js`)

1. **Event Listener**: Attaches submit event to the form
2. **Prevents Default**: Uses `e.preventDefault()` to stop page reload
3. **Data Collection**: Extracts values from form fields into JavaScript variables
4. **User Object Creation**: Creates a user object with the collected data:
   ```javascript
   let user = {
       name: name,
       email: email,
       password: password,
       mobile: mobile
   };
   ```

### 3.3 Local Storage Operations

- **Read**: Retrieves existing users array from localStorage using `JSON.parse(localStorage.getItem("users")) || []`
- **Write**: Pushes new user to array and stores back using `localStorage.setItem("users", JSON.stringify(users))`

### 3.4 AJAX POST Method

The implementation uses XMLHttpRequest for AJAX:

```javascript
let xhr = new XMLHttpRequest();
xhr.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 201) {
        alert("Registration Successful!");
        document.getElementById("registrationForm").reset();
    }
};
xhr.send(JSON.stringify(user));
```

- Uses JSONPlaceholder API (dummy REST API) for POST request
- Content-Type header set to application/json
- On success (status 201), shows alert and resets form

### 3.5 User Display Page (`users.html`)

- Contains an HTML table with columns: Name, Email, Password, Mobile
- Uses JavaScript (`users.js`) to dynamically populate table rows
- Fetches data from localStorage and iterates using `forEach`
- Generates table rows using template literals
- "Back to Registration" button navigates to `index.html`

### 3.6 User Data Display (`users.js`)

1. Retrieves users array from localStorage
2. Iterates through each user using `forEach`
3. Creates table row HTML dynamically
4. Appends rows to table body using `innerHTML +=`

## 4. Key Features

- **Persistent Storage**: Data persists even after browser refresh using localStorage
- **AJAX Implementation**: Asynchronous POST request without page reload
- **Responsive Design**: Bootstrap framework for mobile-friendly UI
- **Form Validation**: HTML5 required attributes for basic validation
- **Dynamic Content**: Table content generated dynamically from stored data

## 5. Flow of Execution

1. User opens `index.html`
2. Fills registration form
3. Clicks "Register" button
4. Form data is captured in JavaScript
5. User object is created and pushed to array
6. Array is saved to localStorage
7. AJAX POST request sends data to external API
8. On success, form is reset and success alert shown
9. User clicks "View Registered Users" to navigate to `users.html`
10. `users.js` fetches data from localStorage and displays in table

## 6. Technologies Used

- HTML5
- CSS3 (Bootstrap 5.3.3)
- JavaScript (ES6)
- Local Storage API
- XMLHttpRequest (AJAX)
- JSONPlaceholder API (for POST demonstration)