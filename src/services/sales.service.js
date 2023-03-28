const { salesModel, productsModel } = require('../models');
const { validateSale } = require('./validations/validations');

const createSale = async (sales) => {
  const { error } = validateSale(sales);
  if (error) return error.details[0];

  const notFound = sales.map(({ productId }) => productsModel.findById(productId));
  
  const prom = await Promise.all(notFound);
  console.log(prom);

  const valid = prom.some((e) => e === undefined);

  if (valid) return { type: 'notFound', message: 'Product not found' };

  const saleId = await salesModel.createSale();

  const promises = sales
    .map(({ productId, quantity }) => salesModel.salesProduct(saleId, productId, quantity));
  await Promise.all(promises);

  const sale = sales.map(({ productId, quantity }) => ({ productId, quantity }));

  return { type: null, message: { id: saleId, itemsSold: sale } };
};

module.exports = {
  createSale,
};