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

module.exports = {
  getAllSales,
  getSaleById,
};