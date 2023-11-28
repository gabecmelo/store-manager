const { insertSaleSchema } = require('./schemas');

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

module.exports = {
  validateSale,
};
