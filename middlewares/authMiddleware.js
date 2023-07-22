const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Replace with the actual path to your User model
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  // Check if token exists in the request header
  const authHeader = req.headers['authorization'];

  // Check if Authorization header is present and in correct format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(' ')[1];

  try {
    // Verify and decode the token using the jwtSecret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user with the ID from the token
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Attach the user to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error authenticating token:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
