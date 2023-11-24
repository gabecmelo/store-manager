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
    const cleanMessage = error.message.replace(/\[\d+\]\./g, '');
    return {
      status: error.message.includes('required')
        ? 'INVALID_VALUE'
        : 'NOT_FOUND_VALUE',
      message: cleanMessage,
    };
  }
};

module.exports = {
  validateProduct,
  validateSale,
};
