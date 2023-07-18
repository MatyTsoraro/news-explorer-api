// controllers/userController.js
const User = require('../models/user');

// Get user information
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('email name');
    res.json(user);
  } catch (error) {
    console.error('Error getting user information:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
