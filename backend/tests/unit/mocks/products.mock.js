const httpMap = {
  SUCCESSFULL: 'SUCCESSFULL',
  NOT_FOUND: 'NOT_FOUND',
  CREATED: 'CREATED',
  INVALID_VALUE: 'INVALID_VALUE',
};

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
  status: httpMap.SUCCESSFULL,
  data: productsFromModel,
};

const productRecoveredFromService = {
  status: httpMap.SUCCESSFULL,
  data: productFromModel,
};

const productNotFoundMessage = {
  message: 'Product not found',
};

const saleNotFoundMessage = {
  message: 'Sale not found',
};

const productNotRecoveredFromService = {
  status: httpMap.NOT_FOUND,
  data: productNotFoundMessage,
};

const saleNotRecoveredFromService = {
  status: httpMap.NOT_FOUND,
  data: saleNotFoundMessage,
};

const insertedProductFromService = {
  status: httpMap.CREATED,
  data: { insertId: productIdFromModel },
};

module.exports = {
  httpMap,
  productsFromModel,
  productsFromDB,
  productFromDB,
  productsRecoveredFromService,
  productFromModel,
  productRecoveredFromService,
  productNotRecoveredFromService,
  saleNotRecoveredFromService,
  productNotFoundMessage,
  saleNotFoundMessage,
  productIdFromModel,
  insertedProductFromService,
};
