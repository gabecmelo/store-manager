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

const updateSaleSchema = Joi.object({
  quantity: Joi.number().required().min(1),
  saleId: Joi.number().required(),
  productId: Joi.number().required(),
});

module.exports = {
  insertProductSchema,
  insertSaleSchema,
  updateSaleSchema,
};
