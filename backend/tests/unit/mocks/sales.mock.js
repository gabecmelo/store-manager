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
  status: 'SUCCESSFULL',
  data: salesFromModel,
};

const saleRecoveredFromService = {
  status: 'SUCCESSFULL',
  data: saleFromModel,
};

module.exports = {
  salesFromModel,
  salesFromDB,
  saleFromDB,
  salesRecoveredFromService,
  saleFromModel,
  saleRecoveredFromService,
};
