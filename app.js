const express = require('express');
const morgan = require('morgan');
const { createLogger, transports, format } = require('winston');
const expressWinston = require('express-winston');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Error logging
const errorLogger = createLogger({
  transports: [
    new transports.File({ filename: './logs/error.log', level: 'error' }),
  ],
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
});

// Create a stream object with a 'write' function
const winstonStream = {
  write: (message) => {
    errorLogger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

// Middleware to parse JSON in request bodies
app.use(express.json());

// Logging middleware for requests
app.use(expressWinston.logger({
  transports: [
    new transports.File({ filename: './logs/request.log' }),
  ],
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  dynamicMeta: (req) => ({ user: req.user ? req.user.email : 'anonymous' }),
}));

// Morgan middleware for additional logging (if needed)
app.use(morgan('combined', { stream: winstonStream }));

// Use environment variables for MongoDB connection
const dbUrl = process.env.NODE_ENV === 'production' ? process.env.DB_URL_PROD : process.env.DB_URL_DEV || 'mongodb://127.0.0.1:27017/test';

// Connect to MongoDB database
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

// Error handling middleware
app.use((err, req, res) => {
  errorLogger.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Define the port the application will listen on
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
