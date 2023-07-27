// routes/articleRoutes.js
const express = require('express');

const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const articleController = require('../controllers/articleController');

// Protected route: Get all articles saved by the user
router.get('/', authMiddleware, articleController.getAllArticles);

// Protected route: Create a new article
router.post('/', authMiddleware, articleController.createArticle);

// Protected route: Delete an article by ID
router.delete('/:articleId', authMiddleware, articleController.deleteArticle);

module.exports = router;
