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
      owner: req.user._id, // Make sure to check for the owner field as well
    });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    await Article.deleteOne({ _id: req.params.articleId, owner: req.user._id }); // Use deleteOne method with owner check
    return res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};
