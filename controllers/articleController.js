// controllers/articleController.js
const Article = require('../models/article');

// Get all articles saved by the user
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({ owner: req.user.id });
    res.json(articles);
  } catch (error) {
    // handle logging error differently
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
    // handle logging error differently
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete an article by ID
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findOne({
      _id: req.params.articleId,
      owner: req.user.id,
    });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    if (article.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Forbidden. You can only delete your own articles' });
    }

    await article.remove();
    return res.json({ message: 'Article deleted successfully' }); // Add return here
  } catch (error) {
    console.error('Error deleting article:', error);
    return res.status(500).json({ error: 'Server error' }); // Add return here
  }
};
