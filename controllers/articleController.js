const Article = require('../models/article');

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({ owner: req.user.id });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const article = new Article({ ...req.body, owner: req.user.id });
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findOne({
      _id: req.params.articleId,
    }).select('+owner');

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Check if the authenticated user is the owner of the article
    if (article.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Forbidden: You are not allowed to delete this article' });
    }

    // If the user is the owner, then proceed with the deletion
    await Article.deleteOne({ _id: req.params.articleId });

    return res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};


