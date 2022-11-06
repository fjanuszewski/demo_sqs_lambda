const Joi = require('@hapi/joi');

const schemaAccountId = Joi.number().min(100).max(9999).required()

module.exports = {
  schemaAccountId
};
