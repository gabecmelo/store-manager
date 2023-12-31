const { salesService } = require('../services');
const { mapStatusHttp } = require('../utils/mapStatusHttp');

const getAllSales = async (_req, res) => {
  const { status, data } = await salesService.getSales();
  res.status(mapStatusHttp(status)).json(data);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.getSale(id);
  res.status(mapStatusHttp(status)).json(data);
};

const registerNewSale = async (req, res) => {
  const saleData = req.body;

  const { status, data } = await salesService.insertNewSale(saleData);

  res.status(mapStatusHttp(status)).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await salesService.deleteSale(id);
  res.status(mapStatusHttp(status)).json(data);
};

const updateProductQuantity = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;

  const { status, data } = await salesService.updateProductQuantity(
    quantity,
    saleId,
    productId,
  );

  res.status(mapStatusHttp(status)).json(data);
};

module.exports = {
  getAllSales,
  getSaleById,
  registerNewSale,
  deleteSale,
  updateProductQuantity,
};
