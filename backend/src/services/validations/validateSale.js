const { insertSaleSchema, updateSaleSchema } = require('./schemas');

const validateSale = (saleData) => {
  const { error } = insertSaleSchema.validate(saleData);
  if (error) {
    const cleanedMessage = error.message.replace(/\[\d+\]\./g, '');
    return {
      status: error.message.includes('required')
        ? 'INVALID_VALUE'
        : 'UNPROCESSABLE',
      message: cleanedMessage,
    };
  }
};

const validateUpdateSale = (saleData) => {
  const { error } = updateSaleSchema.validate(saleData);
  if (error) {
    return {
      status: error.message.includes('required')
        ? 'INVALID_VALUE'
        : 'UNPROCESSABLE',
      message: error.message,
    };
  }
};

const verifyProductInSale = (sale, productId) => {
  const productInSale = sale.some(
    (s) => s.productId === Number(productId),
  );
  return productInSale;
};

module.exports = {
  validateSale,
  validateUpdateSale,
  verifyProductInSale,
};
