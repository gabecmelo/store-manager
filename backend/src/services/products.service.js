const { productsModel } = require('../models');
const schema = require('./validations/validateProduct');

const errorMessages = {
  NOT_FOUND: 'Product not found',
};

const status = {
  NOT_FOUND: 'NOT_FOUND',
  SUCCESSFULL: 'SUCCESSFULL',
  CREATED: 'CREATED',
  NO_CONTENT: 'NO_CONTENT',
};

const getProducts = async () => {
  let data = await productsModel.findAll();

  if (!data || data.length === 0) {
    data = { message: 'Não há produtos disponíveis' };
  }

  return { status: status.SUCCESSFULL, data };
};

const getProduct = async (id) => {
  const data = await productsModel.findById(id);
  if (!data) {
    return {
      status: status.NOT_FOUND,
      data: { message: errorMessages.NOT_FOUND },
    };
  }
  return { status: status.SUCCESSFULL, data };
};

const insertNewProduct = async (productData) => {
  const { name } = productData;

  const error = await schema.validateProduct(productData);
  if (error.status !== 'VALID') {
    return { status: error.status, data: { message: error.message } };
  }

  const insertId = await productsModel.insertProduct(name);

  return { status: status.CREATED, data: { insertId } };
};

const modifyProduct = async (productId, newProduct) => {
  const { name } = newProduct;
  const id = Number(productId);

  const error = await schema.validateProduct(newProduct);

  if (error) {
    return { status: error.status, data: { message: error.message } };
  }

  const affectedRows = await productsModel.changeProduct(id, name);

  if (affectedRows <= 0) {
    return {
      status: status.NOT_FOUND,
      data: { message: errorMessages.NOT_FOUND },
    };
  }

  return {
    status: status.SUCCESSFULL,
    data: { id, name: newProduct.name },
  };
};

const deleteProduct = async (productId) => {
  const affectedRows = await productsModel.deleteProduct(productId);

  if (affectedRows <= 0) {
    return {
      status: status.NOT_FOUND,
      data: { message: errorMessages.NOT_FOUND },
    };
  }

  return { status: status.NO_CONTENT };
};

module.exports = {
  getProducts,
  getProduct,
  insertNewProduct,
  modifyProduct,
  deleteProduct,
};
