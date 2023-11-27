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

const productIdFromDB = 42;
const affectedRowsFromDB = 1;

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
  data: { insertId: productIdFromDB },
};

const modifiedProductFromService = {
  status: httpMockMap.SUCCESSFULL,
  data: modifiedProductFromModel,
};

const deletedProductFromService = {
  status: httpMockMap.NO_CONTENT,
  data: undefined,
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
  productIdFromDB,
  insertedProductFromService,
  productErrors,
  productServiceErrors,
  errorsMessages,
  modifiedProductName,
  modifiedProductFromModel,
  modifiedProductFromService,
  deletedProductFromService,
  affectedRowsFromDB,
};
