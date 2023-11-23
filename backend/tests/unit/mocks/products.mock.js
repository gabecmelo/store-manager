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

module.exports = {
  productsFromModel,
  productsFromDB,
  productFromDB,
  productsRecoveredFromService,
  productFromModel,
  productRecoveredFromService,
};
