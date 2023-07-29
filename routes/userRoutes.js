// routes/userRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();
router.get('/me', authMiddleware, userController.getUserInfo);

module.exports = router;
