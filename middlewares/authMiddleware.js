const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Check if token exists in the request header
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;

    // Verify and decode the token using the jwtSecret
    const decoded = jwt.verify(token, jwtSecret);

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
