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

  const error = await schema.validateProduct(productData);
  if (error) {
    return { status: error.status, data: { message: error.message } };
  }

  const insertId = await productsModel.insertProduct(name);

  return { status: 'CREATED', data: { insertId } };
};

const modifyProduct = async (productId, newProduct) => {
  const { name } = newProduct;
  const id = Number(productId)
  
  const error = await schema.validateProduct(newProduct);

  if (error) {
    return { status: error.status, data: { message: error.message } };
  }

  const affectedRows = await productsModel.changeProduct(id, name);

  if (affectedRows <= 0) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  return {
    status: 'SUCCESSFULL',
    data: { id, name: newProduct.name },
  };
};

module.exports = {
  getProducts,
  getProduct,
  insertNewProduct,
  modifyProduct,
};
