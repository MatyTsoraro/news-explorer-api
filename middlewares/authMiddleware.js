const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
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
