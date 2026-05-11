const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/angular_auth_db')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('User CRUD API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
