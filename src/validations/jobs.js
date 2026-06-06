const Joi = require('joi');

const createJobSchema = Joi.object({
  company_id: Joi.string().required(),
  category_id: Joi.string().allow('', null),
  title: Joi.string().required(),
  description: Joi.string().allow('', null),
  requirements: Joi.string().allow('', null),
  salary_min: Joi.number().allow('', null),
  salary_max: Joi.number().allow('', null),
  location: Joi.string().allow('', null),
  type: Joi.string().allow('', null),
  is_active: Joi.boolean().allow('', null),
});

const updateJobSchema = Joi.object({
  company_id: Joi.string(),
  category_id: Joi.string().allow('', null),
  title: Joi.string(),
  description: Joi.string().allow('', null),
  requirements: Joi.string().allow('', null),
  salary_min: Joi.number().allow('', null),
  salary_max: Joi.number().allow('', null),
  location: Joi.string().allow('', null),
  type: Joi.string().allow('', null),
  is_active: Joi.boolean().allow('', null),
});

module.exports = { createJobSchema, updateJobSchema };
