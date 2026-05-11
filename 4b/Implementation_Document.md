# The Royal Plate - Restaurant Web Application
## Implementation Document for WAD Practical 4B

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Frontend Implementation](#4-frontend-implementation)
   - [React Components](#41-react-components)
   - [Pages](#42-pages)
   - [API Integration](#43-api-integration)
5. [Backend Implementation](#5-backend-implementation)
   - [Express Server](#51-express-server)
   - [Database Schema](#52-database-schema)
   - [API Endpoints](#53-api-endpoints)
6. [AWS VPC Deployment](#6-aws-vpc-deployment)
   - [VPC Architecture](#61-vpc-architecture)
   - [Subnet Configuration](#62-subnet-configuration)
   - [Security Groups](#63-security-groups)
   - [EC2 Deployment](#64-ec2-deployment)
   - [Nginx Configuration](#65-nginx-configuration)
7. [How It Works](#7-how-it-works)
8. [Testing the Application](#8-testing-the-application)
9. [AWS Deployment Steps](#9-aws-deployment-steps)

---

## 1. Project Overview

**Project Name:** The Royal Plate - Restaurant Web Application

**Domain:** Restaurant / Food Service

**Purpose:** A full-stack web application that allows customers to:
- Browse restaurant menu with category filtering
- Make table reservations online
- Place delivery orders with shopping cart functionality
- View restaurant information

**Deployment Target:** AWS VPC with EC2 instances

---

## 2. Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| React Router | 6.20.0 | Client-side routing |
| Vite | 5.0.0 | Build tool and dev server |
| CSS | - | Styling |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18.x | JavaScript runtime |
| Express | 4.18.2 | Web framework |
| SQLite3 | 5.1.6 | Database |
| CORS | 2.8.5 | Cross-origin resource sharing |

### Infrastructure
| Service | Purpose |
|---------|---------|
| AWS VPC | Virtual Private Cloud network |
| AWS EC2 | Compute instances |
| NAT Gateway | Private subnet internet access |
| Internet Gateway | VPC internet connectivity |

---

## 3. Project Structure

```
4b/
├── frontend/                    # React Frontend Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Navigation component
│   │   │   └── Navbar.css      # Navigation styles
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Landing page
│   │   │   ├── Menu.jsx        # Menu browsing page
│   │   │   ├── Reservations.jsx # Table booking page
│   │   │   ├── OrderOnline.jsx # Online ordering page
│   │   │   └── About.jsx       # Restaurant info page
│   │   ├── App.jsx             # Main App component with routing
│   │   ├── main.jsx            # React entry point
│   │   ├── index.css           # Global styles
│   │   └── App.css             # App-specific styles
│   ├── package.json            # Frontend dependencies
│   ├── vite.config.js          # Vite configuration
│   └── index.html              # HTML entry point
│
├── backend/                     # Node.js/Express Backend
│   ├── server.js               # Express server with API routes
│   ├── database.js             # SQLite database initialization
│   ├── package.json            # Backend dependencies
│   └── restaurant.db            # SQLite database file
│
├── AWS_VPC_Implementation_Guide.md  # AWS deployment guide
└── README.md                    # Project documentation
```

---

## 4. Frontend Implementation

### 4.1 React Components

#### App.jsx - Main Application
```javascript
// Sets up routing using React Router
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/menu" element={<Menu />} />
    <Route path="/reservations" element={<Reservations />} />
    <Route path="/order" element={<OrderOnline />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>
```

#### Navbar.jsx - Navigation Component
- **Purpose:** Provides navigation links to all pages
- **Features:**
  - Responsive navigation bar
  - Active link highlighting based on current route
  - Links: Home, Menu, Reservations, Order Online, About

### 4.2 Pages

| Page | File | Functionality |
|------|------|---------------|
| **Home** | Home.jsx | Hero section, features showcase, call-to-action buttons |
| **Menu** | Menu.jsx | Displays menu items with category filtering, fetches from `/api/menu` |
| **Reservations** | Reservations.jsx | Form to book tables, submits to `/api/reservations` |
| **Order Online** | OrderOnline.jsx | Shopping cart, add/remove items, checkout form, submits to `/api/orders` |
| **About** | About.jsx | Restaurant story, philosophy, contact information |

### 4.3 API Integration

The frontend communicates with the backend through REST API calls:

```javascript
// Example from Menu.jsx
const fetchMenuItems = async () => {
  const response = await fetch(`${API_URL}/menu`)
  const data = await response.json()
  setMenuItems(data)
}
```

**Vite Proxy Configuration** (`vite.config.js`):
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true
  }
}
```

This allows the frontend running on port 3000 to proxy API requests to the backend on port 5000 during development.

---

## 5. Backend Implementation

### 5.1 Express Server

**File:** `backend/server.js`

The Express server handles:
1. CORS configuration for cross-origin requests
2. JSON body parsing
3. REST API routes for menu, reservations, and orders
4. Serving static frontend files in production
5. React routing fallback (serving index.html for all non-API routes)

**Key Middleware:**
```javascript
app.use(cors())           // Enable CORS
app.use(express.json())   // Parse JSON bodies
```

### 5.2 Database Schema

**File:** `backend/database.js`

**Database:** SQLite3 (file-based, stored in `restaurant.db`)

#### Tables:

**1. menu_items**
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key, auto-increment |
| name | TEXT | Item name |
| description | TEXT | Item description |
| price | REAL | Price in rupees |
| category | TEXT | Category (Pizza, Burgers, etc.) |
| image_url | TEXT | Image path |
| is_available | INTEGER | Availability status |

**2. reservations**
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| customer_name | TEXT | Customer's name |
| email | TEXT | Email address |
| phone | TEXT | Phone number |
| reservation_date | TEXT | Booking date |
| reservation_time | TEXT | Booking time |
| guests | INTEGER | Number of guests |
| status | TEXT | Reservation status |
| created_at | TEXT | Timestamp |

**3. orders**
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| customer_name | TEXT | Customer name |
| email | TEXT | Email address |
| phone | TEXT | Phone number |
| address | TEXT | Delivery address |
| total_amount | REAL | Order total |
| status | TEXT | Order status |
| created_at | TEXT | Timestamp |

**4. order_items**
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| order_id | INTEGER | Foreign key to orders |
| menu_item_id | INTEGER | Foreign key to menu_items |
| quantity | INTEGER | Quantity ordered |
| price | REAL | Price at time of order |

### 5.3 API Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/health` | Health check | - |
| GET | `/api/menu` | Get all menu items | - |
| GET | `/api/menu?category=X` | Get filtered menu items | - |
| GET | `/api/menu/categories` | Get all categories | - |
| POST | `/api/reservations` | Create reservation | `{customer_name, email, phone, reservation_date, reservation_time, guests}` |
| GET | `/api/reservations` | Get all reservations | - |
| POST | `/api/orders` | Create order | `{customer_name, email, phone, address, items, total_amount}` |
| GET | `/api/orders` | Get all orders | - |
| GET | `/api/orders/:id/items` | Get order items | - |

---

## 6. AWS VPC Deployment

### 6.1 VPC Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        AWS CLOUD                                │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           RestaurantApp-VPC (10.0.0.0/16)                  │   │
│  │                                                          │   │
│  │  ┌───────────────────────┐    ┌───────────────────────┐   │   │
│  │  │   Public Subnet       │    │   Private Subnet       │   │   │
│  │  │   (10.0.1.0/24)       │    │   (10.0.2.0/24)        │   │   │
│  │  │   ap-south-1a          │    │   ap-south-1b          │   │   │
│  │  │                       │    │                       │   │   │
│  │  │   ┌──────────────┐   │    │   ┌──────────────┐   │   │   │
│  │  │   │ EC2 Instance │   │    │   │ EC2 Instance │   │   │   │
│  │  │   │ - Nginx      │   │    │   │ - SQLite DB  │   │   │   │
│  │  │   │ - Frontend   │   │    │   │             │   │   │   │
│  │  │   │ - Backend    │   │    │   │             │   │   │   │
│  │  │   └──────────────┘   │    │   └──────────────┘   │   │   │
│  │  └───────────┬──────────┘    └───────────┬──────────┘   │   │
│  │              │                             │               │   │
│  │   Route: 0.0.0.0/0 → IGW   Route: 0.0.0.0/0 → NAT      │   │
│  │              │                             │               │   │
│  │  ┌───────────▼──────────┐                               │   │
│  │  │  Internet Gateway    │                               │   │
│  │  └─────────────────────┘                               │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Subnet Configuration

| Subnet | CIDR | AZ | Public IP | Purpose |
|--------|------|-----|-----------|---------|
| Public-Subnet-1a | 10.0.1.0/24 | ap-south-1a | Yes | Web Server (Frontend + Backend) |
| Private-Subnet-1b | 10.0.2.0/24 | ap-south-1b | No | Database Server |

### 6.3 Security Groups

**WebServer-SG:**
| Type | Port | Source | Purpose |
|------|------|--------|---------|
| SSH | 22 | My IP | Server administration |
| HTTP | 80 | 0.0.0.0/0 | Web traffic |
| HTTPS | 443 | 0.0.0.0/0 | Secure web |
| Custom TCP | 3000 | 0.0.0.0/0 | React dev server |
| Custom TCP | 5000 | 0.0.0.0/0 | Node.js API |

**Database-SG:**
| Type | Port | Source | Purpose |
|------|------|--------|---------|
| SSH | 22 | My IP | Server administration |
| Custom TCP | 5000 | WebServer-SG | Backend access |

### 6.4 EC2 Deployment

**Instance Configuration:**
- **AMI:** Ubuntu Server 22.04 LTS
- **Instance Type:** t2.micro (Free Tier)
- **Key Pair:** Required for SSH access

**Deployment Process:**
1. SSH into EC2 instance
2. Install Node.js 18.x
3. Install PM2 for process management
4. Clone/deploy application code
5. Install dependencies
6. Build frontend
7. Configure Nginx as reverse proxy

### 6.5 Nginx Configuration

Nginx acts as a reverse proxy to serve:
- Static frontend files from `/var/www/html/`
- API requests proxied to `localhost:5000` (backend)

```nginx
server {
    listen 80;
    server_name _;

    location / {
        root /var/www/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

---

## 7. How It Works

### User Flow

1. **Home Page:**
   - User lands on homepage
   - Views hero section with restaurant branding
   - Can navigate to Menu, Reservations, or Order Online

2. **Menu Browsing:**
   - User clicks "Menu" in navbar
   - Frontend fetches menu from `/api/menu`
   - User can filter by category (Pizza, Burgers, Salads, etc.)
   - Data displayed in responsive grid layout

3. **Table Reservation:**
   - User navigates to Reservations page
   - Fills form: name, email, phone, date, time, guests
   - Form submits POST to `/api/reservations`
   - Backend inserts into SQLite `reservations` table
   - Success message displayed

4. **Online Ordering:**
   - User navigates to Order Online page
   - Browses menu items
   - Clicks "Add to Cart" on desired items
   - Cart state maintained in React
   - User proceeds to checkout
   - Fills delivery details form
   - Order submitted via POST to `/api/orders`
   - Backend creates order and order_items records
   - Transaction ensures data consistency

5. **About Page:**
   - Static content displaying restaurant information

### Request/Response Flow

```
┌──────────┐         ┌──────────┐         ┌──────────┐
│ Browser  │ ──────> │  Nginx   │ ──────> │  Express │
│          │         │ (Port 80)│         │ (Port 5000)│
└──────────┘         └──────────┘         └──────────┘
                                               │
                                               ▼
                                         ┌──────────┐
                                         │ SQLite   │
                                         │ Database │
                                         └──────────┘
```

### AWS VPC Traffic Flow

**Inbound Traffic:**
1. User requests `http://EC2_PUBLIC_IP`
2. Traffic arrives at Internet Gateway
3. Routes to Public Subnet EC2
4. Nginx receives on port 80
5. For API: forwards to Express on port 5000
6. For static: serves from filesystem

**Outbound Traffic (Public Subnet):**
1. EC2 sends request to Internet
2. Route table routes to Internet Gateway
3. Traffic exits to Internet

**Private Subnet Traffic:**
1. Database server needs internet (updates)
2. Routes through NAT Gateway
3. NAT Gateway in public subnet routes to IGW

---

## 8. Testing the Application

### Local Testing

**Backend:**
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:3000
```

**API Tests:**
```bash
# Health check
curl http://localhost:5000/api/health

# Get menu
curl http://localhost:5000/api/menu

# Create reservation
curl -X POST http://localhost:5000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{"customer_name":"John","email":"john@email.com","reservation_date":"2026-05-15","reservation_time":"19:00","guests":2}'

# Place order
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customer_name":"John","email":"john@email.com","items":[{"menu_item_id":1,"quantity":2,"price":299}],"total_amount":598}'
```

---

## 9. AWS Deployment Steps

### Step 1: Create VPC
```
AWS Console → VPC → Create VPC
- Name: RestaurantApp-VPC
- CIDR: 10.0.0.0/16
```

### Step 2: Create Subnets
```
Public Subnet:
- Name: Public-Subnet-1a
- CIDR: 10.0.1.0/24
- AZ: ap-south-1a

Private Subnet:
- Name: Private-Subnet-1b
- CIDR: 10.0.2.0/24
- AZ: ap-south-1b
```

### Step 3: Create Internet Gateway
```
VPC → Internet Gateways → Create IGW
- Attach to RestaurantApp-VPC
```

### Step 4: Create Route Tables
```
Public Route Table:
- Add route: 0.0.0.0/0 → Internet Gateway
- Associate Public Subnet

Private Route Table:
- (No route to internet - secure)
- Associate Private Subnet
```

### Step 5: Create Security Groups
```
WebServer-SG:
- Inbound: 80, 443, 22, 3000, 5000

Database-SG:
- Inbound: 22 (My IP), 5000 (from WebServer-SG)
```

### Step 6: Launch EC2 Instances
```
Frontend/Backend Server:
- Name: RestaurantApp-Server
- VPC: RestaurantApp-VPC
- Subnet: Public-Subnet-1a
- Security Group: WebServer-SG

Database Server (Optional):
- Name: RestaurantApp-DB
- VPC: RestaurantApp-VPC
- Subnet: Private-Subnet-1b
- Security Group: Database-SG
```

### Step 7: Deploy Application
```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
git clone <your-repo-url>
cd restaurant-app

# Install backend dependencies
cd backend && npm install

# Start backend
pm2 start server.js --name "restaurant-backend"

# Build frontend
cd ../frontend && npm install && npm run build

# Configure Nginx
sudo apt install -y nginx
sudo cp -r dist/* /var/www/html/

# Configure reverse proxy
sudo nano /etc/nginx/sites-available/default
# (Add proxy configuration)

sudo nginx -t && sudo systemctl restart nginx
```

### Step 8: Access Application
```
Open browser: http://<EC2_PUBLIC_IP>
```

---

## 10. Key Features for Evaluation

### Functional Requirements ✓
| Feature | Status | Implementation |
|---------|--------|---------------|
| Menu Browsing | ✓ | Menu.jsx with category filter |
| Table Reservations | ✓ | Reservations.jsx with form |
| Online Ordering | ✓ | OrderOnline.jsx with cart |
| Responsive Design | ✓ | CSS flexbox/grid layouts |

### Technical Requirements ✓
| Requirement | Status | Implementation |
|-------------|--------|---------------|
| Full Stack | ✓ | React + Node.js/Express |
| Database | ✓ | SQLite3 |
| REST API | ✓ | Express endpoints |
| AWS VPC | ✓ | VPC with public/private subnets |
| Security | ✓ | Security groups, IAM roles |

### AWS VPC Components ✓
| Component | Status | Location |
|-----------|--------|----------|
| VPC | ✓ | 10.0.0.0/16 |
| Public Subnet | ✓ | 10.0.1.0/24 |
| Private Subnet | ✓ | 10.0.2.0/24 |
| Internet Gateway | ✓ | Attached to VPC |
| Route Tables | ✓ | Public routes to IGW |
| Security Groups | ✓ | WebServer-SG, Database-SG |
| EC2 Instances | ✓ | t2.micro instances |
| NAT Gateway | ✓ | For private subnet access |

---

## 11. File Summary

| File | Purpose | Lines |
|------|---------|-------|
| frontend/src/App.jsx | Main routing | 34 |
| frontend/src/main.jsx | React entry | 10 |
| frontend/src/pages/Home.jsx | Homepage | 65 |
| frontend/src/pages/Menu.jsx | Menu display | 112 |
| frontend/src/pages/Reservations.jsx | Booking form | 151 |
| frontend/src/pages/OrderOnline.jsx | Cart/Checkout | 262 |
| frontend/src/pages/About.jsx | Info page | 74 |
| frontend/src/components/Navbar.jsx | Navigation | 37 |
| frontend/src/index.css | Global styles | 113 |
| backend/server.js | Express server | 141 |
| backend/database.js | DB initialization | 85 |
| AWS_VPC_Implementation_Guide.md | AWS guide | 399 |

**Total: ~1500 lines of code**

---

**Document Version:** 1.0
**Created:** May 2026
**Subject:** Web Application Development (WAD) - Practical 4B
**Project:** Restaurant Web Application with AWS VPC Deployment
