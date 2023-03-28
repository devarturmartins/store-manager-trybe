const { salesService } = require('../services');

const createSales = async (req, res) => {
  const salesProduct = req.body;
  const sales = await salesService.createSale(salesProduct);
  if (sales.type === 'notFound') return res.status(404).json({ message: sales.message });
  if (sales.type === 'any.required') return res.status(400).json({ message: sales.message });
  if (sales.type === 'number.positive') return res.status(422).json({ message: sales.message });
  return res.status(201).json(sales.message);
};

module.exports = {
  createSales,
};
