const express = require('express');
const morgan = require('morgan');
const { createLogger, transports, format } = require('winston');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const authRoutes = require('./routes/authRoutes');

const index = express();

// Create a stream object with a 'write' function
const winstonStream = {
  write: (message) => {
    errorLogger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

// Middleware to parse JSON in request bodies
index.use(express.json());

// Logging middleware
index.use(morgan('combined', { stream: winstonStream }));

// Error logging
const errorLogger = createLogger({
  transports: [
    new transports.File({ filename: './logs/error.log', level: 'error' }),
  ],
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
});

// Error handling middleware
index.use((err, req, res, next) => {
  errorLogger.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Connect to MongoDB database
mongoose.connect('mongodb+srv://matytsoraro:6yGWLKsXhRsC5ls2@cluster0.va69nzn.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Routes
index.use('/users', userRoutes);
index.use('/articles', articleRoutes);
index.use('/auth', authRoutes);

index.listen(3000, () => {
  console.log('Server started on port 3000');
});
