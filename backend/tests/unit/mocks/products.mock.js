const productsFromModel = [
  { id: 1, name: 'name' },
  { id: 2, name: 'name' },
];

const productsFromDB = [
  { id: 1, name: 'name' },
  { id: 2, name: 'name' },
];

const productFromModel = { id: 42, name: 'name' };

const productFromDB = { id: 42, name: 'name' };

const productsRecoveredFromService = {
  status: 'SUCCESSFULL',
  data: productsFromModel,
};

const productRecoveredFromService = {
  status: 'SUCCESSFULL',
  data: productFromModel,
};

const productNotFoundMessage = {
  message: 'Product not found',
};

const saleNotFoundMessage = {
  message: 'Sale not found',
};

const productNotRecoveredFromService = {
  status: 'NOT_FOUND',
  data: productNotFoundMessage,
};

const saleNotRecoveredFromService = {
  status: 'NOT_FOUND',
  data: saleNotFoundMessage,
};

module.exports = {
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
};
