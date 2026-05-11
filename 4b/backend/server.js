const express = require('express');
const cors = require('cors');
const db = require('./database');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes

// Get all menu items
app.get('/api/menu', (req, res) => {
  const { category } = req.query;
  let sql = 'SELECT * FROM menu_items WHERE is_available = 1';
  const params = [];
  
  if (category && category !== 'all') {
    sql += ' AND category = ?';
    params.push(category);
  }
  
  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get menu categories
app.get('/api/menu/categories', (req, res) => {
  db.all('SELECT DISTINCT category FROM menu_items WHERE is_available = 1', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows.map(row => row.category));
  });
});

// Create reservation
app.post('/api/reservations', (req, res) => {
  const { customer_name, email, phone, reservation_date, reservation_time, guests } = req.body;
  
  if (!customer_name || !email || !reservation_date || !reservation_time || !guests) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const sql = `INSERT INTO reservations (customer_name, email, phone, reservation_date, reservation_time, guests) 
               VALUES (?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [customer_name, email, phone || '', reservation_date, reservation_time, guests], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, message: 'Reservation created successfully' });
  });
});

// Get all reservations
app.get('/api/reservations', (req, res) => {
  db.all('SELECT * FROM reservations ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Create order
app.post('/api/orders', (req, res) => {
  const { customer_name, email, phone, address, items, total_amount } = req.body;
  
  if (!customer_name || !email || !items || items.length === 0) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  db.serialize(() => {
    const orderSql = `INSERT INTO orders (customer_name, email, phone, address, total_amount) 
                      VALUES (?, ?, ?, ?, ?)`;
    
    db.run(orderSql, [customer_name, email, phone || '', address || '', total_amount], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      const orderId = this.lastID;
      const itemStmt = db.prepare(`INSERT INTO order_items (order_id, menu_item_id, quantity, price) 
                                   VALUES (?, ?, ?, ?)`);
      
      items.forEach(item => {
        itemStmt.run(orderId, item.menu_item_id, item.quantity, item.price);
      });
      
      itemStmt.finalize();
      res.status(201).json({ id: orderId, message: 'Order placed successfully' });
    });
  });
});

// Get all orders
app.get('/api/orders', (req, res) => {
  db.all('SELECT * FROM orders ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get order items for a specific order
app.get('/api/orders/:id/items', (req, res) => {
  const sql = `SELECT oi.*, m.name as item_name FROM order_items oi 
               JOIN menu_items m ON oi.menu_item_id = m.id 
               WHERE oi.order_id = ?`;
  db.all(sql, [req.params.id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Restaurant API is running' });
});

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Handle React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
