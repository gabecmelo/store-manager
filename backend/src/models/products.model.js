const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products ORDER BY id'
  );
  return products;
};

const findById = async (id) => {
  const [[product]] = await connection.execute(
    `SELECT * FROM products 
    WHERE id = ?`,
    [id]
  );

  return product;
};

const insertProduct = async (name) => {
  const [insertId] = await connection.execute(
    `
  INSERT INTO products(name)
  VALUES (?);`,
    [name]
  );

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insertProduct,
};
