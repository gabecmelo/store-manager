const { salesModel } = require('../models');
const saleSchema = require('./validations/validateSale');
const productSchema = require('./validations/validateProduct');
const httpStatusMap = require('./statusMap');

const getSales = async () => {
  let data = await salesModel.findAll();

  if (!data || data.length === 0) {
    data = { message: 'Não há produtos disponíveis' };
  }

  return { status: httpStatusMap.SUCCESSFULL, data };
};

const getSale = async (id) => {
  const data = await salesModel.findById(id);
  if (!data || data.length === 0) {
    return {
      status: httpStatusMap.NOT_FOUND,
      data: { message: 'Sale not found' },
    };
  }
  return { status: httpStatusMap.SUCCESSFULL, data };
};

const insertNewSale = async (saleData) => {
  const error = saleSchema.validateSale(saleData);
  if (error) {
    return { status: error.status, data: { message: error.message } };
  }

  const productsInStorage = await productSchema.validateProductsInStorage(
    saleData
  );
  if (!productsInStorage) {
    return {
      status: httpStatusMap.NOT_FOUND,
      data: { message: 'Product not found' },
    };
  }

  const insertId = await salesModel.createNewSale();
  await salesModel.insertProductsOnSale(insertId, saleData);
  return {
    status: httpStatusMap.CREATED,
    data: { id: insertId, itemsSold: saleData },
  };
};

const deleteSale = async (saleId) => {
  const affectedRows = await salesModel.deleteSale(saleId);
  if (affectedRows > 0) return { status: httpStatusMap.NO_CONTENT };
  return {
    status: httpStatusMap.NOT_FOUND,
    data: { message: 'Sale not found' },
  };
};

module.exports = {
  getSales,
  getSale,
  insertNewSale,
  deleteSale,
};
