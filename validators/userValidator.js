// validators/userValidator.js
const { signupSchema, signinSchema } = require('../schemas/userSchemas');

exports.signupValidator = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
  // Add an explicit return statement
  return null;
};

exports.signinValidator = (req, res, next) => {
  const { error } = signinSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
  // Add an explicit return statement
  return null;
};
