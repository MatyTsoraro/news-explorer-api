
const express = require('express');
const morgan = require('morgan');
const winston = require('winston');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Logging middleware
app.use(morgan('combined', {
  stream: winston.stream.writeStream({ filename: './logs/request.log' }),
}));

// Error logging
const errorLogger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

// Error handling middleware
app.use((err, req, res, next) => {
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

// Middleware to parse JSON in request bodies
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);
app.use('/auth', authRoutes);


app.listen(3000, () => {
  console.log('Server started on port 3000');
});


//6yGWLKsXhRsC5ls2
//mongodb+srv://matytsoraro:6yGWLKsXhRsC5ls2@cluster0.va69nzn.mongodb.net/