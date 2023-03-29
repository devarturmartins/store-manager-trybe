const connection = require('./connection');

async function createSale() {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return insertId;
}

async function salesProduct(saleId, productId, quantity) {
  // const columns = Object.keys().join(', ');

  // const placeholders = Object.keys(sales).map((_key) => '?').join(', ');

  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return insertId;
}

async function findById(id) {
  const [[result]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id=?', [id]);
  return result;
}

async function findAll() {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');
  return result;
}

async function findSales() {
  const [result] = await connection
    .execute(
      `SELECT s.id AS saleId,
      s.date AS date,
      p.product_id AS productId,
      p.quantity AS quantity
      FROM
      StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS p ON s.id = p.sale_id`,
    );
  return result;
}

async function salesById(id) {
  const [result] = await connection
    .execute(
      `SELECT
      s.date AS date,
      p.product_id AS productId,
      p.quantity AS quantity
      FROM
      StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS p ON s.id = p.sale_id
      WHERE s.id =?;`, [id],
    );
  return result;
}

module.exports = {
  createSale,
  salesProduct,
  findById,
  findAll,
  findSales,
  salesById,
};