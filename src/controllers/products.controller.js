const { productsService } = require('../services');

const findProducts = async (_req, res) => {
  const products = await productsService.findProducts();
  return res.status(200).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.findById(id);
  if (product.type) return res.status(400).json(product);
  if (product.error) return res.status(404).json(product.error.message);
  return res.status(200).json(product.message);
};

module.exports = {
  findProducts,
  findById,
};
