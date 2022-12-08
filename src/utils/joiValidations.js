import Joi from 'joi';

const email = Joi.string()
  .email({ tlds: { allow: false } })
  .min(5)
  .max(255)
  .required();

const password = Joi.string().min(3).max(30).required();

const name = Joi.string().alphanum().min(2).max(30).required();

export { email, password, name };
