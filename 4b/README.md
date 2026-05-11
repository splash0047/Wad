# The Royal Plate - Restaurant Web Application

A full-stack restaurant web application built with React (frontend) and Node.js/Express (backend).

## Features

- **Menu Browsing** - View restaurant menu with categories (Pizza, Burgers, Salads, Pasta, Desserts, Beverages)
- **Table Reservations** - Book a table online with date, time, and guest selection
- **Online Ordering** - Add items to cart and place delivery orders
- **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **Frontend:** React, React Router, Vite
- **Backend:** Node.js, Express
- **Database:** SQLite3

## Project Structure

```
4b/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── database.js
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── App.css
│       ├── components/
│       │   ├── Navbar.jsx
│       │   └── Navbar.css
│       └── pages/
│           ├── Home.jsx
│           ├── Menu.jsx
│           ├── Reservations.jsx
│           ├── OrderOnline.jsx
│           └── About.jsx
├── AWS_VPC_Implementation_Guide.md
└── README.md
```

## Quick Start

### Backend Setup

```bash
cd backend
npm install
npm start
```

Server will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

### Production Build

```bash
cd frontend
npm run build
```

The built files will be in `frontend/dist/`. The backend is configured to serve these static files.

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/menu` | GET | Get all menu items |
| `/api/menu/categories` | GET | Get menu categories |
| `/api/reservations` | POST | Create a reservation |
| `/api/reservations` | GET | Get all reservations |
| `/api/orders` | POST | Place an order |
| `/api/orders` | GET | Get all orders |

## AWS VPC Deployment

Refer to `AWS_VPC_Implementation_Guide.md` for step-by-step instructions on deploying this application to AWS VPC with EC2 instances.

---

**Created for:** WAD Practical 4B
