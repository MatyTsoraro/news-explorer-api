// routes/authRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const { signupValidator, signinValidator } = require('../validators/userValidator');

const router = express.Router();
//user registration
router.post('/signup', signupValidator, userController.signup);
//user login
router.post('/signin', signinValidator, userController.signin);

module.exports = router;
