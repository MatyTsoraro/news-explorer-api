require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { createLogger, transports, format } = require('winston');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const authRoutes = require('./routes/authRoutes'); // new line

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

// Logging middleware
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
app.use(authRoutes); // added this line
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);

// Respond to requests to the root the application
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my API!' });
});

// Handler for non-existent routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  errorLogger.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Define the port the application will listen on
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app as a module
module.exports = app;
