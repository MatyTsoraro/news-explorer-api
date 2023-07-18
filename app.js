// index.js
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Article = require('./models/article');

const app = express();

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


app.listen(3000, () => {
  console.log('Server started on port 3000');
});


//6yGWLKsXhRsC5ls2
//mongodb+srv://matytsoraro:6yGWLKsXhRsC5ls2@cluster0.va69nzn.mongodb.net/