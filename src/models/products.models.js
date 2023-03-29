// const camelize = require('camelize');
const connection = require('./connection');

async function findAll() {
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.products');
  return result;
}

async function findById(id) {
  const [[result]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id=?', [id]);
  return result;
}

async function createProduct(name) {
  const [result] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUES (?)', [name]);
  return { id: result.insertId, name };
}

async function updateProduct(id, name) {
  await connection
    .execute(
      'UPDATE StoreManager.products SET name=? WHERE id=?',
      [name, id],
  );
  const [[result]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id=?', [id]);
  return result;
}

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
};