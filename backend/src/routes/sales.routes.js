const salesRoutes = require('express').Router();
const { salesController } = require('../controllers');

salesRoutes.get('/', salesController.getAllSales);

salesRoutes.get('/:id', salesController.getSaleById);

salesRoutes.post('/', salesController.registerNewSale);

salesRoutes.delete('/:id', salesController.deleteSale);

module.exports = salesRoutes;
