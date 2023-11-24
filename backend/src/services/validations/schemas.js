const Joi = require('joi');

const insertProductSchema = Joi.object({
  name: Joi.string().required().min(5),
});

const insertSaleSchema = Joi.array().items(
  Joi.object({
    productId: Joi.number().required().min(1),
    quantity: Joi.number().required().min(1),
  }),
);

module.exports = {
  insertProductSchema,
  insertSaleSchema,
};
