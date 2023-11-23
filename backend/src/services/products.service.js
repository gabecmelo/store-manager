const { productsModel } = require('../models');
const schema = require('./validations/validateProduct');

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

const insertNewProduct = async (productData) => {
  const { name } = productData;

  const error = schema.validateProduct(productData);
  if (error) return { status: error.status, data: { message: error.message } };
  const newProduct = await productsModel.insertProduct(name);
  return { status: 'CREATED', data: newProduct };
};

module.exports = {
  getProducts,
  getProduct,
  insertNewProduct,
};
