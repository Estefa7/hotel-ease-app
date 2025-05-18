const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admins', adminRoutes); // POST /api/admins/auth/login

const roomRoutes = require('./routes/roomRoutes');
app.use('/api/rooms', roomRoutes);   // Example: protected room routes

// Root test route
app.get('/', (req, res) => {
  res.send('HotelEase backend is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
