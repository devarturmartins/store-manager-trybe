const { productsModel } = require('../models');
const { validateId } = require('./validations/validations');

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

module.exports = {
  findProducts,
  findById,
};
