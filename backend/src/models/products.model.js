const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

module.exports = {
  findAll,
};
