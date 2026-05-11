# Node.js Static Website Server - Implementation Documentation

## Overview

This application is a Node.js-based web server that serves a static website. The website includes a simple chat interface with interactive features. The server uses the **Express.js** framework to handle HTTP requests and serve static files.

---

## Project Structure

```
3a/
├── package.json          # Project configuration and dependencies
├── server.js             # Main server file
├── public/               # Static files directory
│   ├── index.html        # Main HTML page
│   ├── style.css         # Styling for the website
│   └── script.js         # Client-side JavaScript
└── node_modules/        # Dependencies (installed packages)
```

---

## File-by-File Explanation

### 1. package.json

**Purpose:** Configuration file that defines project metadata and manages dependencies.

**Content Breakdown:**

| Field | Value | Explanation |
|-------|-------|-------------|
| name | `static-website-server` | Project identifier |
| version | `1.0.0` | Semantic version |
| description | "A simple Node.js application that serves a static website" | Project purpose |
| main | `server.js` | Entry point of the application |
| scripts | `"start": "node server.js"` | Command to run the server |
| dependencies | `"express": "^4.18.2"` | Express.js framework |

**How to Install Dependencies:**
```bash
npm install
```
This command reads `package.json` and installs Express.js into the `node_modules` folder.

---

### 2. server.js

**Purpose:** The main server file that creates and configures the Express application.

**Line-by-Line Explanation:**

```javascript
const express = require('express');
```
- Imports the Express.js framework
- `require()` is Node.js's way of loading modules
- `express` is the web framework for creating the server

```javascript
const path = require('path');
```
- Imports the built-in `path` module
- Used for handling and transforming file paths
- Essential for creating cross-platform compatible path references

```javascript
const app = express();
```
- Creates an instance of an Express application
- This `app` object is used to configure routes and middleware
- Think of it as the core of our web server

```javascript
const PORT = process.env.PORT || 3000;
```
- Defines the port number for the server
- `process.env.PORT` allows environment variable configuration (useful for deployment platforms like Heroku)
- Falls back to port 3000 if no environment variable is set

```javascript
app.use(express.static(path.join(__dirname, 'public')));
```
- **This is the key line for serving static files**
- `app.use()` registers middleware (functions that run during the request-response cycle)
- `express.static()` is built-in middleware that serves static files (HTML, CSS, JS, images)
- `path.join(__dirname, 'public')` creates the absolute path to the `public` folder
  - `__dirname` = absolute path to the folder containing `server.js`
  - `'public'` = the folder name where static files are stored
- When a client requests a file (e.g., `/style.css`), Express looks in the `public` folder

```javascript
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
```
- Catches all GET requests that don't match previous routes
- `*` is a wildcard that matches any URL path
- Serves `index.html` as a fallback (useful for Single Page Applications)
- This ensures that visiting any route displays the main page

```javascript
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```
- Starts the HTTP server
- `app.listen()` binds the server to the specified port
- The callback function runs when server starts successfully
- Prints a message to the console confirming the server is running

---

### 3. public/index.html

**Purpose:** The main HTML page that defines the structure of the website.

**Key Elements:**

| Element | Purpose |
|---------|---------|
| `<header>` | Contains the main heading |
| `<main>` | Contains the page content |
| `<div class="chat-box">` | Container for chat functionality |
| `<div id="chatDisplay">` | Display area for chat messages |
| `<input id="msgInput">` | Text input for typing messages |
| `<button id="sendBtn">` | Button to send messages |
| `<p id="status">` | Status message display |

**External Resources:**
- `style.css` - Linked via `<link rel="stylesheet" href="style.css">`
- `script.js` - Linked via `<script src="script.js"></script>`

---

### 4. public/style.css

**Purpose:** Provides visual styling for the website.

**Styling Highlights:**
- Uses flexbox for centering content
- Purple theme (#6200ea primary color)
- Chat box styling with sent/received message differentiation
- Responsive design with max-width constraints
- Hover effects on buttons

---

### 5. public/script.js

**Purpose:** Client-side JavaScript that adds interactivity to the website.

**Functionality:**
1. **Message Sending:** Clicking "Send" or pressing Enter adds the message to chat
2. **Message Display:** Messages appear in the chat display area
3. **Status Updates:** Shows "Message sent!" and "Message received!" feedback
4. **Auto-scroll:** Chat display scrolls to show new messages

**Key Functions:**
- `addMessage(text, type)` - Creates and appends message elements
- Event listeners for button click and Enter key press

---

## How the Application Works

### Request Flow Diagram

```
User's Browser
      │
      ▼
http://localhost:3000
      │
      ▼
┌─────────────────────────────────┐
│      Node.js Server             │
│  (server.js + Express)          │
├─────────────────────────────────┤
│ 1. Receives HTTP Request        │
│ 2. Matches route                │
│    - Static files: serve from   │
│      public/ folder              │
│    - Other routes: serve        │
│      index.html (fallback)      │
└─────────────────────────────────┘
      │
      ▼
Response (HTML/CSS/JS/JSON)
      │
      ▼
Browser renders the content
```

### Step-by-Step Execution

1. **Server Start:**
   - Run `npm start` or `node server.js`
   - Server listens on port 3000

2. **Browser Request:**
   - User opens `http://localhost:3000`
   - Browser sends GET request to server

3. **Server Processing:**
   - Express checks the request path
   - No specific route defined for `/`
   - `express.static()` middleware finds `public/index.html`
   - Express reads and sends the HTML file

4. **Browser Rendering:**
   - Browser receives HTML
   - Encounters `<link rel="stylesheet" href="style.css">`
   - Makes another request for `style.css`
   - Encounters `<script src="script.js"></script>`
   - Makes another request for `script.js`
   - Express serves all files from `public/` folder

5. **Interactive Features:**
   - JavaScript runs in the browser
   - User can type messages and send them
   - Chat interface works client-side

---

## Running the Application

### Prerequisites
- Node.js installed on the system

### Steps to Run

1. **Navigate to project directory:**
   ```bash
   cd "C:\Users\Pinak chimurkar\Desktop\Wad practicals\3a"
   ```

2. **Install dependencies (if not already installed):**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   Or directly:
   ```bash
   node server.js
   ```

4. **Access the website:**
   - Open a web browser
   - Navigate to: `http://localhost:3000`

---

## Key Concepts Explained

### What is Express.js?
Express.js is a minimal and flexible Node.js web application framework that provides robust features for web and mobile applications. It simplifies the process of building web servers.

### What is Middleware?
Middleware functions are functions that have access to the request object (`req`), response object (`res`), and the next middleware function in the application lifecycle. In our code, `express.static()` is middleware that serves static files.

### What is the `public` Directory?
The `public` folder is a convention in Express applications to store static assets that should be served directly to clients without any processing. This includes HTML, CSS, JavaScript, images, and other files.

### Why Use `path.join(__dirname, 'public')`?
- `__dirname` gives the absolute path to the folder containing `server.js`
- This ensures the server can find the `public` folder regardless of where Node.js is run from
- `path.join()` creates the correct path separator for the operating system (backslash on Windows, forward slash on Unix/Linux)

---

## Summary

This Node.js application demonstrates:
1. **Setting up an Express server** - Creating and configuring a basic web server
2. **Serving static files** - Using Express middleware to serve HTML, CSS, and JavaScript
3. **Creating a frontend** - Building a simple chat interface with HTML, CSS, and JavaScript
4. **Client-server interaction** - How the browser communicates with the Node.js server

The application is a complete, working example of serving a static website using Node.js and Express.js.