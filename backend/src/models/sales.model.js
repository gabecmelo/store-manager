const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity 
    FROM sales_products sp
    JOIN sales s ON sp.sale_id = s.id
    ORDER BY sp.sale_id, product_id;`,
  );
  return camelize(sales);
};

const findById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity 
    FROM sales_products sp
    INNER JOIN sales s ON sp.sale_id = s.id
    WHERE sp.sale_id = ?
    ORDER BY sp.sale_id, product_id;`,
    [id],
  );
  return camelize(sale);
};

const createNewSale = async () => {
  const [newSale] = await connection.execute(
    `INSERT INTO sales(date)
    VALUES(now())`,
  );
  return camelize(newSale);
};

const insertProductsOnSale = async (saleId, saleData) => {
  const result = await Promise.all(
    saleData.map(async (product) => {
      const { productId, quantity } = product;
      return connection.execute(
        `INSERT INTO sales_products(sale_id, product_id, quantity)
        VALUES(?, ?, ?)`,
        [saleId, productId, quantity],
      );
    }),
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  createNewSale,
  insertProductsOnSale,
};
