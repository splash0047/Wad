const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'restaurant.db'));

// Initialize tables
db.serialize(() => {
  // Menu items table
  db.run(`CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    is_available INTEGER DEFAULT 1
  )`);

  // Reservations table
  db.run(`CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    reservation_date TEXT NOT NULL,
    reservation_time TEXT NOT NULL,
    guests INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  // Orders table
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    total_amount REAL NOT NULL,
    status TEXT DEFAULT 'received',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  // Order items table
  db.run(`CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    menu_item_id INTEGER,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
  )`);

  // Insert sample menu data if empty
  db.get("SELECT COUNT(*) as count FROM menu_items", (err, row) => {
    if (err) {
      console.error(err);
      return;
    }
    if (row.count === 0) {
      const stmt = db.prepare(`INSERT INTO menu_items (name, description, price, category, image_url) VALUES (?, ?, ?, ?, ?)`);
      
      const menuItems = [
        ["Margherita Pizza", "Classic tomato sauce, mozzarella, fresh basil", 299, "Pizza", "/images/pizza.jpg"],
        ["Pepperoni Pizza", "Tomato sauce, mozzarella, pepperoni slices", 399, "Pizza", "/images/pizza.jpg"],
        ["Chicken Burger", "Grilled chicken patty with lettuce, tomato, mayo", 199, "Burgers", "/images/burger.jpg"],
        ["Veggie Burger", "Plant-based patty with fresh vegetables", 179, "Burgers", "/images/burger.jpg"],
        ["Caesar Salad", "Romaine lettuce, croutons, parmesan, caesar dressing", 149, "Salads", "/images/salad.jpg"],
        ["Greek Salad", "Cucumber, tomatoes, olives, feta cheese", 169, "Salads", "/images/salad.jpg"],
        ["Pasta Alfredo", "Creamy white sauce with fettuccine pasta", 249, "Pasta", "/images/pasta.jpg"],
        ["Spaghetti Bolognese", "Rich meat sauce with spaghetti", 279, "Pasta", "/images/pasta.jpg"],
        ["Chocolate Brownie", "Warm chocolate brownie with vanilla ice cream", 129, "Desserts", "/images/dessert.jpg"],
        ["Cheesecake", "Classic New York style cheesecake", 149, "Desserts", "/images/dessert.jpg"],
        ["Mango Smoothie", "Fresh mango blended with yogurt", 99, "Beverages", "/images/drink.jpg"],
        ["Iced Coffee", "Cold brew coffee with milk", 119, "Beverages", "/images/drink.jpg"]
      ];
      
      menuItems.forEach(item => stmt.run(item));
      stmt.finalize();
      console.log('Sample menu data inserted');
    }
  });
});

module.exports = db;
