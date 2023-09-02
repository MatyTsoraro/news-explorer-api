// validators/articleValidator.js
const { createArticleSchema, deleteArticleSchema } = require('../schemas/articleSchemas');

exports.createArticleValidator = (req, res, next) => {
  const { error } = createArticleSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
  // Add an explicit return statement
  return null;
};

exports.deleteArticleValidator = (req, res, next) => {
  const { error } = deleteArticleSchema.validate(req.params);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
  // Add an explicit return statement
  return null;
};
