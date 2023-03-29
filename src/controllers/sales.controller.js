const { salesService } = require('../services');

const createSales = async (req, res) => {
  const salesProduct = req.body;
  const sales = await salesService.createSale(salesProduct);
  if (sales.type === 'notFound') return res.status(404).json({ message: sales.message });
  if (sales.type === 'any.required') return res.status(400).json({ message: sales.message });
  if (sales.type === 'number.positive') return res.status(422).json({ message: sales.message });
  return res.status(201).json(sales.message);
};

const findSales = async (req, res) => {
  const sales = await salesService.findSales();
  if (!sales) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(sales);
};

const salesById = async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.salesById(id);
  if (sales.length === 0) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(sales);
};

module.exports = {
  createSales,
  findSales,
  salesById,
};
