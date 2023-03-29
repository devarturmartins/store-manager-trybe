const { productsService } = require('../services');

const findProducts = async (_req, res) => {
  const products = await productsService.findProducts();
  return res.status(200).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.findById(id);
  if (product.type) return res.status(400).json(product);
  if (product.error) return res.status(404).json(product.error);
  return res.status(200).json(product.message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const product = await productsService.createProduct(name);
  if (product.type === 'length') return res.status(422).json({ message: product.message });
  if (product.type === 'inputvazio') return res.status(400).json({ message: product.message });
  return res.status(201).json(product.message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await productsService.updateProduct(id, name);
  if (result.type === 'length') return res.status(422).json({ message: result.message });
  if (result.type === 'inputvazio') return res.status(400).json({ message: result.message });
  if (result.type === 'notFound') return res.status(404).json({ message: result.message });
  return res.status(200).json(result.message);
};

module.exports = {
  findProducts,
  findById,
  createProduct,
  updateProduct,
};
