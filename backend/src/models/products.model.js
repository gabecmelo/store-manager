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
  const [{ insertId }] = await connection.execute(
    `
    INSERT INTO products(name)
    VALUES (?);`,
    [name],
  );
  return camelize(insertId);
};

const changeProduct = async (productId, newProductData) => {
  const [{ affectedRows }] = await connection.execute(
    `UPDATE products
    SET name = ?
    WHERE id = ?`,
    [newProductData, productId],
  );

  return affectedRows;
};

const deleteProduct = async (productId) => {
  const [{ affectedRows }] = await connection.execute(
    `DELETE FROM products
    WHERE id = ?`,
    [productId],
  );
  return affectedRows;
};

const searchProduct = async (query) => {
  let product;

  if (query) {
    const likeQuery = `%${query}%`;
    [product] = await connection.execute(
      `SELECT * FROM products
      WHERE name LIKE ?`,
      [likeQuery],
    );
  } else {
    product = await findAll();
  }

  return camelize(product);
};

module.exports = {
  findAll,
  findById,
  insertProduct,
  changeProduct,
  deleteProduct,
  searchProduct,
};
