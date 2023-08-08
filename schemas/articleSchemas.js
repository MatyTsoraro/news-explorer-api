const Joi = require('joi');

const urlRegex = /^(https?:\/\/)?([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/i;

exports.createArticleSchema = Joi.object({
  keyword: Joi.string().required(),
  title: Joi.string().required(),
  text: Joi.string().required(),
  date: Joi.string().required(),
  source: Joi.string().required(),
  link: Joi.string().pattern(urlRegex).required(),
  image: Joi.string().uri().required(),
});

exports.deleteArticleSchema = Joi.object({
  articleId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
});
