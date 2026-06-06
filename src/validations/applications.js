const Joi = require('joi');

const createApplicationSchema = Joi.object({
  job_id: Joi.string().required(),
  cover_letter: Joi.string().allow('', null),
});

const updateApplicationSchema = Joi.object({
  status: Joi.string().valid('pending', 'reviewed', 'accepted', 'rejected').required(),
});

module.exports = { createApplicationSchema, updateApplicationSchema };
