const productsRoutes = require('express').Router();
const { productsController } = require('../controllers');

productsRoutes.get('/', productsController.getAllProducts);

productsRoutes.get('/:id', productsController.getProductById);

productsRoutes.post('/', productsController.registerNewProduct);

productsRoutes.put('/:id', productsController.modifyProduct);

module.exports = productsRoutes;
