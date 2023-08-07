const Joi = require('joi');

exports.createArticleSchema = Joi.object({
  keyword: Joi.string().required(),
  title: Joi.string().required(),
  text: Joi.string().required(),
  date: Joi.string().required(),
  source: Joi.string().required(),
  link: Joi.string().uri().required(), // validates URI format
  image: Joi.string().uri().required(), // validates URI format
});

exports.deleteArticleSchema = Joi.object({
  articleId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), // validates MongoDB ObjectId
});
