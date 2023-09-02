const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// User registration
exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
    });

    const savedUser = await user.save();

    // Don't return the token, return user's data except password
    return res.status(201).json({ email: savedUser.email, name: savedUser.name });
  } catch (error) {
    console.error('Error registering user:', error);
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Server error' });
  }
};

// User login
exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select('+password');

    if (user && await user.comparePassword(req.body.password)) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1d' });

      return res.json({ token });
    }

    return res.status(401).json({ error: 'Email or password is incorrect' });
  } catch (error) {
    console.error('Error signing in:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Get user information
exports.getUserInfo = async (req, res) => {
  try {
    // Retrieve the user information from the database using user's id from the request object
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send the user information in the response
    return res.json({ email: user.email, name: user.name });
  } catch (error) {
    console.error('Error getting user information:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};
