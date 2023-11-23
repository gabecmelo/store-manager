const Joi = require('joi');

const insertProductSchema = Joi.object({
  name: Joi.string().required().min(5),
});

module.exports = {
  insertProductSchema,
};
