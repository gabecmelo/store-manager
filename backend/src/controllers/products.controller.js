const { productsService } = require('../services');
const { mapStatusHttp } = require('../utils/mapStatusHttp');

const getAllProducts = async (_req, res) => {
  const { status, data } = await productsService.getProducts();
  res.status(mapStatusHttp(status)).json(data);
};

module.exports = {
  getAllProducts,
};