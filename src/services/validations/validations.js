const { idSchema, nameSchema } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { error: { code: 'invalid_data', message: error.message } };
  return { type: null, message: 'gg, padrinho' };
};

const validateName = (name) => {
  const { error } = nameSchema.validate(name);
  if (error) return { error: { code: 'invalid_data', message: error.message } };
  return { type: null, message: 'gg, padrinho' };
};

// const validateQuantity = (quantity) => {
//   const { error } = quantitySchema.validate(quantity);
//   if (error) return { error: { code: 'invalid_data', message: error.message } };
//   return { type: null, message: 'gg, padrinho' };
// };

module.exports = {
  validateId,
  validateName,
};