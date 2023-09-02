const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const articleController = require('../controllers/articleController');
const { createArticleValidator, deleteArticleValidator } = require('../validators/articleValidator');

const router = express.Router();

router.get('/', authMiddleware, articleController.getAllArticles);
router.post('/', authMiddleware, createArticleValidator, articleController.createArticle);
router.delete('/:articleId', authMiddleware, deleteArticleValidator, articleController.deleteArticle);

module.exports = router;
