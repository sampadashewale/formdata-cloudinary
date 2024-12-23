const express = require('express');
const dotenv = require('dotenv');
const uploadRoutes = require('./routes/upload.routes.js');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', uploadRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to File Upload API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
