// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User registration
router.post('/signup', userController.signup);

// User login
router.post('/signin', userController.signin);

module.exports = router;
