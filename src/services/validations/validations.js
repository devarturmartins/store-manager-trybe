const Joi = require('joi');
const { idSchema, nameSchema, nameSchemaLength, saleSchema } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { code: 'invalid_data', type: 'idInvalido', message: error.message };
  return { type: null, message: '' };
};

const validateName = (name) => {
  const { error } = nameSchema.validate(name);
  if (error) {
    return {
      code: 'invalid_data',
      type: 'inputvazio',
      message: '"name" is required',
    };
  }
  return { type: null, message: '' };
};

const validateLengthName = (name) => {
  const { error } = nameSchemaLength.validate(name);
  if (error) {
    return {
      code: 'invalid_data',
      type: 'length',
      message: '"name" length must be at least 5 characters long',
    };
  }
  return { type: null, message: '' };
};

const validateSale = (sale) => {
  const saleArraySchema = Joi.array().items(saleSchema);
  const { error } = saleArraySchema.validate(sale);
  if (error) return { type: 'a', error };
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateName,
  validateLengthName,
  validateSale,
};