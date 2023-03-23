const { productsModel } = require('../models');
const { validateId, validateName } = require('./validations/validations');

const findProducts = async () => {
  const products = await productsModel.findAll();
  return products;
};

const findById = async (id) => {
  const error = validateId(id);
  if (error.type) return error;
  const product = await productsModel.findById(id);
  if (!product) return { error: { message: 'Product not found' } };
  return { type: null, message: product };
};

const createProduct = async (name) => {
  const error = validateName(name);
  if (error.type) return error;
  const product = await productsModel.createProduct(name);
  return { type: null, message: product };
};


module.exports = {
  findProducts,
  findById,
  createProduct,
};
