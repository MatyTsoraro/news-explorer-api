// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// Protected route: Get user information
router.get('/me', authMiddleware, userController.getUserInfo);

module.exports = router;
