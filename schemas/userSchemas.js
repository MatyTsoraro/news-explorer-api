// schemas/userSchemas.js
const Joi = require('joi');

exports.signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).max(30).required()
});

exports.signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
