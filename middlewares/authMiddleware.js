// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config');

const authMiddleware = (req, res, next) => {
  // Check if token exists in the request header
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Add the decoded user information to the request object
    req.user = decoded.user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error authenticating token:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
