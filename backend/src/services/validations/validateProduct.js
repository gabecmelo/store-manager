const { insertProductSchema } = require('./schemas');

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

module.exports = {
  validateProduct,
};
