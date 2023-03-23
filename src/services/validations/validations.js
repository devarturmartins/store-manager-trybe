const { idSchema, nameSchema, nameSchemaLength } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { error: { code: 'invalid_data', message: error.message } };
  return { type: null, message: 'gg, padrinho' };
};

const validateName = (name) => {
  const { error } = nameSchema.validate(name);
  if (error) return { code: 'invalid_data', type: 'inputvazio', message: '"name" is required' };
  return { type: null, message: '' };
};

const validateLengthName = (name) => {
  const { error } = nameSchemaLength.validate(name);
  if (error) return { code: 'invalid_data', type: 'length', message: '"name" length must be at least 5 characters long' }
  return { type: null, message: '' };
}

// const validateQuantity = (quantity) => {
//   const { error } = quantitySchema.validate(quantity);
//   if (error) return { error: { code: 'invalid_data', message: error.message } };
//   return { type: null, message: 'gg, padrinho' };
// };

module.exports = {
  validateId,
  validateName,
  validateLengthName,
};