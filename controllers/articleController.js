// controllers/articleController.js
const Article = require('../models/article');

// Get all articles saved by the user
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({ owner: req.user.id });
    res.json(articles);
  } catch (error) {
    console.error('Error getting articles:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new article
exports.createArticle = async (req, res) => {
  try {
    const article = new Article({ ...req.body, owner: req.user.id });
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete an article by ID
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({
      _id: req.params.articleId,
      owner: req.user.id,
    });
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
