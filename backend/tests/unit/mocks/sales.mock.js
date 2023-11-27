const { httpMockMap } = require(".");

const salesFromModel = [
  { saleId: 1, date: '2023-11-23 14:00:14', productId: '1', quantity: 5 },
  { saleId: 2, date: '2023-06-22 11:30:34', productId: '2', quantity: 15 },
];

const salesFromDB = [
  { saleId: 1, date: '2023-11-23 14:00:14', productId: '1', quantity: 5 },
  { saleId: 2, date: '2023-06-22 11:30:34', productId: '2', quantity: 15 },
];

const saleFromModel = [
  { date: '2023-11-23 18:18:18', productId: '1', quantity: 7 },
  { date: '2023-11-23 18:18:18', productId: '2', quantity: 3 },
];

const saleFromDB = [
  { date: '2023-11-23 18:18:18', productId: '1', quantity: 7 },
  { date: '2023-11-23 18:18:18', productId: '2', quantity: 3 },
];

const salesRecoveredFromService = {
  status: httpMockMap.SUCCESSFULL,
  data: salesFromModel,
};

const saleRecoveredFromService = {
  status: httpMockMap.SUCCESSFULL,
  data: saleFromModel,
};

const saleIdFromModel = 42;

const saleNotFoundMessage = {
  message: 'Sale not found',
};

const saleNotRecoveredFromService = {
  status: httpMockMap.NOT_FOUND,
  data: saleNotFoundMessage,
};

const insertedSaleFromService = {
  status: httpMockMap.CREATED,
  data: saleFromModel,
};

module.exports = {
  saleIdFromModel,
  saleNotRecoveredFromService,
  salesFromModel,
  salesFromDB,
  saleFromDB,
  salesRecoveredFromService,
  saleFromModel,
  saleRecoveredFromService,
  insertedSaleFromService,
  saleNotFoundMessage,
};
