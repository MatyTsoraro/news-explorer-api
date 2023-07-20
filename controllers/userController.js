// controllers/userController.js
const User = require('../models/user');

// User registration
exports.signup = async (req, res) => {
  try {
    // ...existing code for user registration
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// User login
exports.signin = async (req, res) => {
  try {
    // ...existing code for user login
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get user information
exports.getUserInfo = async (req, res) => {
  try {
    // Retrieve the user information from the request object
    const { email, name } = req.user;

    // Send the user information in the response
    res.json({ email, name });
  } catch (error) {
    console.error('Error getting user information:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
