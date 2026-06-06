const Joi = require('joi');

const createCompanySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  email: Joi.string().email().allow('', null),
  phone: Joi.string().allow('', null),
  logo: Joi.string().allow('', null),
});

const updateCompanySchema = Joi.object({
  name: Joi.string(),
  description: Joi.string().allow('', null),
  location: Joi.string().allow('', null),
  email: Joi.string().email().allow('', null),
  phone: Joi.string().allow('', null),
  logo: Joi.string().allow('', null),
});

module.exports = { createCompanySchema, updateCompanySchema };
