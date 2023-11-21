const { productsModel } = require('../models');

const getProducts = async () => {
  let data = await productsModel.findAll();

  if (!data || data.length === 0) {
    data = { message: 'Não há produtos disponíveis' };
  }

  return { status: 'SUCCESSFULL', data };
};

const getProduct = async (id) => {
  const data = await productsModel.findById(id);
  if (!data) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFULL', data };
};

module.exports = {
  getProducts,
  getProduct,
};
