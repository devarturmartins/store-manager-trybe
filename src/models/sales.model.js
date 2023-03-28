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

module.exports = {
  createSale,
  salesProduct,
  findById,
  findAll,
};