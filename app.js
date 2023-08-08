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
const errorLogger = createLogger({
  transports: [
    new transports.File({ filename: './logs/error.log', level: 'error' }),
  ],
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
});
const winstonStream = {
  write: (message) => {
    errorLogger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};
app.use(express.json());
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
  useCreateIndex:true,
  family:4,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Define the port the application will listen on
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  })
// Enable CORS for all routes
app.use(cors());
app.use(authRoutes);
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my API!' });
});
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
app.use((err, req, res) => {
  errorLogger.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
