
//models/article.js
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^https?:\/\/\S+$/.test(value),
      message: 'Invalid URL format',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^https?:\/\/\S+$/.test(value),
      message: 'Invalid URL format',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    select: false,
  },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
