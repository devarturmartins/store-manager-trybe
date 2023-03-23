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

module.exports = {
  findAll,
  findById,
  createProduct,
};