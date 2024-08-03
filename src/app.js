require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dogRoutes = require('./routes/dogRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('../config/mongoose');

const app = express();

connectDB();

// Middleware to parse JSON
app.use(express.json());

// Use dog routes
app.use('/api', dogRoutes);

// Use authentication routes
app.use('/api/auth', authRoutes);

// Start the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Export app and server for testing
module.exports = { app, server };
