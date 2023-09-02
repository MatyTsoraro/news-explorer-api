const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./logger');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware to parse JSON in request bodies
app.use(express.json());

// Request logger middleware
app.use(requestLogger);

// Connect to MongoDB database
const dbUrl = process.env.NODE_ENV === 'production' ? process.env.DB_URL_PROD : process.env.DB_URL_DEV || 'mongodb://127.0.0.1:27017/test';

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Enable CORS for all routes
app.use(cors());

// Routes
app.use(authRoutes);
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);

// Respond to requests to the root of the application
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my API!' });
});

// Handler for non-existent routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error logger middleware
app.use(errorLogger);

// Error handling middleware
app.use((err, req, res) => {
  errorLogger.error(err); // Log the error
  res.status(500).json({ error: 'Internal Server Error' });
});

// Define the port the application will listen on
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
