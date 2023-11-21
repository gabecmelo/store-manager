const productsRoutes = require('express').Router();
const { productsController } = require('../controllers');

productsRoutes.get('/', productsController.getAllProducts);

module.exports = productsRoutes;
