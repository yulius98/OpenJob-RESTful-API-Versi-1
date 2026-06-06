const { ClientError } = require('../exceptions');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    throw new ClientError(error.details[0].message);
  }
  next();
};

module.exports = validate;
