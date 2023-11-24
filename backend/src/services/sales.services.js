const { salesModel, productsModel } = require('../models');
const schema = require('./validations/validateProduct');

const getSales = async () => {
  let data = await salesModel.findAll();

  if (!data || data.length === 0) {
    data = { message: 'Não há produtos disponíveis' };
  }

  return { status: 'SUCCESSFULL', data };
};

const getSale = async (id) => {
  const data = await salesModel.findById(id);
  if (!data || data.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESSFULL', data };
};

const verifyTest = async (saleData) => {
  const products = await productsModel.findAll();
  return saleData.every((product) => {
    const productInStorage = products.some((p) => p.id === product.productId);
    return productInStorage;
  });
};

const insertNewSale = async (saleData) => {
  const error = schema.validateSale(saleData);
  if (error) {
    return { status: error.status, data: { message: error.message } };
  }

  const productsInStorage = await verifyTest(saleData);
  if (!productsInStorage) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  const { insertId } = await salesModel.createNewSale();
  await salesModel.insertProductsOnSale(insertId, saleData);
  return { status: 'CREATED', data: { id: insertId, itemsSold: saleData } };
};

module.exports = {
  getSales,
  getSale,
  insertNewSale,
};
