const productsFromModel = [
  { id: 1, name: 'name' },
  { id: 2, name: 'name' },
];

const productsFromDB = [
  { id: 1, name: 'name' },
  { id: 2, name: 'name' },
];

const productsRecoveredFromService = {
  status: 'SUCCESSFULL',
  data: productsFromModel,
};

module.exports = {
  productsFromModel,
  productsFromDB,
  productsRecoveredFromService,
};
