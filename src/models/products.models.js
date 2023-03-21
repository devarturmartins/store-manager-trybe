// const camelize = require('camelize');
const connection = require('./connection');

async function findAll() {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');
  return result;
};

async function findById(id) {
  const [[result]] = await connection.execute('SELECT * FROM StoreManager.products WHERE id=?', [id]);
  return result;
};

module.exports = {
  findAll,
  findById,
};