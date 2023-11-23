const { productsService } = require('../services');
const { mapStatusHttp } = require('../utils/mapStatusHttp');

const getAllProducts = async (_req, res) => {
  const { status, data } = await productsService.getProducts();
  res.status(mapStatusHttp(status)).json(data);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.getProduct(id);
  res.status(mapStatusHttp(status)).json(data);
};

const registerNewProduct = async (req, res) => {
  const product = req.body;

  const { status, data } = await productsService.insertNewProduct(product);

  const newProduct = { id: data.insertId, name: product.name };

  res.status(mapStatusHttp(status)).json(newProduct);
};

module.exports = {
  getAllProducts,
  getProductById,
  registerNewProduct,
};
