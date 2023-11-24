const { productsModel } = require('../../models');
const { insertProductSchema, insertSaleSchema } = require('./schemas');

const validateProduct = (productData) => {
  const { error } = insertProductSchema.validate(productData);
  if (error) {
    return {
      status: error.message.includes('required')
        ? 'INVALID_VALUE'
        : 'NOT_FOUND_VALUE',
      message: error.message,
    };
  }
};

const validateSale = (saleData) => {
  const { error } = insertSaleSchema.validate(saleData);
  if (error) {
    const cleanedMessage = error.message.replace(/\[\d+\]\./g, '');
    return {
      status: error.message.includes('required')
        ? 'INVALID_VALUE'
        : 'NOT_FOUND_VALUE',
      message: cleanedMessage,
    };
  }
};

const validateProductsInStorage = async (saleData) => {
  const products = await productsModel.findAll();
  return saleData.every((product) => {
    const productInStorage = products.some((p) => p.id === product.productId);
    return productInStorage;
  });
};

module.exports = {
  validateProduct,
  validateSale,
  validateProductsInStorage,
};
