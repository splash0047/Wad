# E-Commerce Admin Dashboard Documentation

## Project Overview
This project implements a responsive E-Commerce Admin Dashboard with sidebar navigation and statistics cards using HTML, CSS, and Bootstrap 5. The dashboard provides a complete admin interface for managing an online store with multiple pages for Dashboard, Orders, Products, and Customers.

## Problem Statement
Create a responsive web page which shows the ecommerce/college/exam admin dashboard with sidebar and statistics in cards using HTML, CSS and Bootstrap.

## File Structure

```
1a/
├── index.html      # Main dashboard with statistics cards
├── orders.html     # Orders management page
├── products.html   # Products management page
├── customers.html  # Customers management page
└── style.css      # Custom styling for all pages
```

---

## Implementation Details

### 1. Common Structure (All Pages)

#### HTML Head Section
- **Meta Tags**: UTF-8 encoding, viewport for responsive design
- **Title**: Dynamic page titles
- **External Resources**:
  - Bootstrap 5 CSS (v5.3.2)
  - Bootstrap Icons (v1.11.1)
  - Custom CSS (style.css)

#### Sidebar Navigation
- Fixed position on left side (260px width)
- Dark theme background (#1e293b)
- Navigation links:
  - Dashboard (index.html)
  - Orders (orders.html)
  - Products (products.html)
  - Customers (customers.html)
  - Settings (placeholder link)
- Active state highlighting with indigo accent color
- Smooth hover transitions

#### Main Content Area
- Left margin of 260px (matches sidebar width)
- Padding of 25px
- Contains page-specific content

#### JavaScript Functionality
- Sidebar toggle button for mobile responsive
- Click event to open/close sidebar
- Overlay click to close sidebar
- Auto-close sidebar on navigation (mobile only)

---

### 2. Dashboard Page (index.html)

#### Page Title
- "Dashboard" with hamburger menu toggle

#### Statistics Cards (4 Cards in Row)
Uses Bootstrap grid: col-md-6 col-xl-3 (responsive)

| Card | Statistic | Icon | Color |
|------|-----------|------|-------|
| 1 | Total Revenue: 48,295 | Currency Dollar | Indigo (#4f46e5) |
| 2 | Total Orders: 1,245 | Shopping Bag | Cyan (#06b6d4) |
| 3 | Total Customers: 3,842 | People | Green (#10b981) |
| 4 | Products Sold: 856 | Box | Amber (#f59e0b) |

#### Card Components
- **Top Section**: Icon (left) + Percentage change (right)
- **Value**: Large bold number
- **Label**: Descriptive text

#### Percentage Indicators
- Positive (green): +12.5%, +8.2%, +15.3%
- Negative (red): -2.1%

#### Chart Section (Commented/Optional)
Three chart types prepared for integration:
1. Revenue & Orders Trend (Line Chart)
2. Product Stock Status (Doughnut Chart)
3. Customer Status Distribution (Bar Chart)

---

### 3. Orders Page (orders.html)

#### Table Structure
| Column | Description |
|--------|--------------|
| Order ID | Unique identifier (e.g., #ORD-001) |
| Customer | Avatar + Name |
| Product | Product name |
| Date | Order date |
| Amount | Price in dollars |
| Status | Status badge |

#### Order Data (4 Sample Records)
1. #ORD-001: Akshat Kulakrni - Wireless Headphones - Delivered
2. #ORD-002: Pinak chimurkar - Smart Watch Pro - Processing
3. #ORD-003: Ritesh ranbaware - Running Shoes - Pending
4. #ORD-004: Vedant ahire - Yoga Mat Premium - Delivered

#### Status Badges
- **Delivered** (green): Completed orders
- **Processing** (blue): Orders being processed
- **Pending** (yellow): Awaiting processing
- **Cancelled** (red): Cancelled orders

---

### 4. Products Page (products.html)

#### Product Grid Layout
- Bootstrap grid: col-md-6 col-lg-4 col-xl-3
- Responsive card-based display

#### Product Cards (6 Products)
| Product | Price | Stock Status |
|---------|-------|--------------|
| Wireless Headphones | $129.99 | In Stock |
| Smart Watch Pro | $249.50 | Low Stock |
| Running Shoes | $89.00 | In Stock |
| Bluetooth Speaker | $79.99 | Out of Stock |
| Laptop Stand | $45.00 | In Stock |
| Gaming Mouse | $59.99 | In Stock |

#### Product Card Components
- Icon placeholder area (160px height)
- Product title
- Price display
- Stock status badge

---

### 5. Customers Page (customers.html)

#### Table Structure
| Column | Description |
|--------|--------------|
| Customer | Avatar + Name |
| Email | Customer email |
| Phone | Contact number |
| Orders | Order count |
| Total Spent | Total spending amount |
| Status | Active/Inactive badge |

#### Customer Data (4 Sample Records)
1. Pinak Chimurkar - 12 orders - $1,245 - Active
2. Akshat Kulakrni - 8 orders - $890.50 - Active
3. Ritesh Ranbaware - 5 orders - $450 - Pending
4. Vedant Ahire - 15 orders - $2,100 - Active

---

### 6. Styling (style.css)

#### Color Palette
| Purpose | Color |
|---------|-------|
| Primary | Indigo (#4f46e5) |
| Secondary | Cyan (#06b6d4) |
| Success | Green (#10b981) |
| Warning | Amber (#f59e0b) |
| Error | Red (#ef4444) |
| Dark | Slate (#1e293b) |
| Light | Slate (#f8fafc) |

#### Key CSS Features

**Sidebar**
- Fixed position, 260px width
- Dark background (#1e293b)
- Border-left active indicator (indigo)

**Stat Cards**
- White background with shadow
- Hover lift effect (translateY -3px)
- Rounded corners (12px)
- Gradient icon backgrounds

**Tables**
- Custom header styling
- Hover row effects
- Vertical middle alignment

**Status Badges**
- Pill-shaped (border-radius: 20px)
- Color-coded backgrounds
- Uppercase small text

**Responsive Design**
- Breakpoints: 992px (tablet), 768px (mobile)
- Sidebar slides in from left on mobile
- Overlay covers content when sidebar open
- Toggle button appears below 992px

---

## Technologies Used

| Technology | Purpose | Version |
|------------|---------|---------|
| HTML5 | Semantic structure | - |
| CSS3 | Styling & animations | - |
| Bootstrap 5 | UI Framework | 5.3.2 |
| Bootstrap Icons | Icon library | 1.11.1 |

---

## Responsive Features

1. **Desktop (>992px)**: Full sidebar visible, 4-column stat cards
2. **Tablet (768-991px)**: 2-column stat cards, collapsible sidebar
3. **Mobile (<768px)**: Single column, hamburger menu, overlay sidebar

---

## How to Run

1. Open `index.html` in a web browser
2. Navigate between pages using sidebar links
3. Test responsive behavior by resizing browser
4. On mobile, tap hamburger icon to open sidebar

---

## Customization Options

### Adding Charts
Uncomment Chart.js CDN and chart sections in index.html

### Adding More Pages
1. Create new HTML file
2. Include common sidebar structure
3. Add unique main content

### Modifying Colors
Update CSS variables or specific class colors in style.css