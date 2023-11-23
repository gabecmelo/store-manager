const { salesModel } = require('../models');

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

const insertNewSale = async (saleData) => {
  const { insertId } = await salesModel.createNewSale();

  await salesModel.insertProductsOnSale(insertId, saleData);

  return { status: 'CREATED', data: { id: insertId } };
};

module.exports = {
  getSales,
  getSale,
  insertNewSale,
};
