const { productsService } = require('../services');
const { mapStatusHttp } = require('../utils/mapStatusHttp');

const getAllProducts = async (_req, res) => {
  const { status, data } = await productsService.getProducts();
  return res.status(mapStatusHttp(status)).json(data);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.getProduct(id);
  return res.status(mapStatusHttp(status)).json(data);
};

const registerNewProduct = async (req, res) => {
  const product = req.body;

  const { status, data } = await productsService.insertNewProduct(product);

  if (data.message) {
    return res.status(mapStatusHttp(status)).json(data);
  }

  const newProduct = await productsService.getProduct(data.insertId);

  return res.status(mapStatusHttp(status)).json(newProduct.data);
};

const modifyProduct = async (req, res) => {
  const { id } = req.params;
  const newProduct = req.body;

  const { status, data } = await productsService.modifyProduct(id, newProduct);

  return res.status(mapStatusHttp(status)).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await productsService.deleteProduct(id);

  return res.status(mapStatusHttp(status)).json(data);
};

module.exports = {
  getAllProducts,
  getProductById,
  registerNewProduct,
  modifyProduct,
  deleteProduct,
};
