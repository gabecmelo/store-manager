const { httpMockMap } = require('.');

const newProductName = 'New product';

const productFromModel = { id: 42, name: newProductName };

const productFromDB = { id: 42, name: newProductName };

const productsFromModel = [
  { id: 1, name: newProductName },
  { id: 2, name: newProductName },
];

const productsFromDB = [
  { id: 1, name: newProductName },
  { id: 2, name: newProductName },
];

const productIdFromModel = 42;

const productsRecoveredFromService = {
  status: httpMockMap.SUCCESSFULL,
  data: productsFromModel,
};

const productRecoveredFromService = {
  status: httpMockMap.SUCCESSFULL,
  data: productFromModel,
};

const productNotFoundMessage = {
  message: 'Product not found',
};

const productNotRecoveredFromService = {
  status: httpMockMap.NOT_FOUND,
  data: productNotFoundMessage,
};

const insertedProductFromService = {
  status: httpMockMap.CREATED,
  data: { insertId: productIdFromModel },
};

const productErrors = {
  invalidValue: { status: 'INVALID_VALUE', message: '""name" is required"' },
}

module.exports = {
  productsFromModel,
  productsFromDB,
  productFromDB,
  productsRecoveredFromService,
  productFromModel,
  productRecoveredFromService,
  productNotRecoveredFromService,
  productNotFoundMessage,
  productIdFromModel,
  insertedProductFromService,
  productErrors
};
