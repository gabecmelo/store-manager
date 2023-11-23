const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products ORDER BY id',
  );
  return products;
};

const findById = async (id) => {
  const [[product]] = await connection.execute(
    `SELECT * FROM products 
    WHERE id = ?`,
    [id],
  );

  return camelize(product);
};

const insertProduct = async (name) => {
  const [newProduct] = await connection.execute(
    `
    INSERT INTO products(name)
    VALUES (?);`,
    [name],
  );
  return camelize(newProduct);
};

module.exports = {
  findAll,
  findById,
  insertProduct,
};
