const { httpMockMap } = require('.');

const newProductName = 'New product';
const modifiedProductName = 'New product';

const modifiedProductFromModel = { id: 42, name: modifiedProductName };

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

const modifiedProductFromService = {
  status: httpMockMap.SUCCESSFULL,
  data: modifiedProductFromModel,
};

const errorsMessages = {
  invalidValue: '""name" is required"',
  invalidLength: '"name" length must be at least 5 characters long',
};

const productErrors = {
  invalidValue: {
    status: 'INVALID_VALUE',
    message: errorsMessages.invalidValue,
  },
  invalidLength: {
    status: 'UNPROCESSABLE',
    message: errorsMessages.invalidLength,
  },
};

const productServiceErrors = {
  invalidValue: {
    status: 'INVALID_VALUE',
    data: { message: errorsMessages.invalidValue },
  },
  invalidLength: {
    status: 'UNPROCESSABLE',
    message: errorsMessages.invalidLength,
  },
};

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
  productErrors,
  productServiceErrors,
  errorsMessages,
  modifiedProductName,
  modifiedProductFromModel,
  modifiedProductFromService
};
