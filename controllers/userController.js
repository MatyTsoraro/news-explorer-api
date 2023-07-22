// controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
exports.signup = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.body.password:', req.body.password);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// User login
exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select('+password');

    if (user && await user.comparePassword(req.body.password)) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

      res.json({ token });
    } else {
      res.status(401).json({ error: 'Email or password is incorrect' });
    }

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
