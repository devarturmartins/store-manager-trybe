const Joi = require('joi');

const idSchema = Joi.number().integer().positive().min(1)
  .required();

const nameSchema = Joi.string().required();
const nameSchemaLength = Joi.string().required().min(5);

// validação req 6 - criar venda e validar
const saleSchema = Joi.object({
  productId: Joi.number().integer().positive().min(1)
    .required()
    .label('productId'),
  quantity: Joi.number().integer().positive().min(1)
    .required()
    .label('quantity'),
}).messages({
  'any.required': '{{#label}} is required',
  'number.positive': '{{#label}} must be greater than or equal to 1',
  'number.base': '"{{#label}}" must be a number',
  'number.integer': '"{{#label}}" must be an integer',
  'number.min': '"{{#label}}" must be larger than or equal to {{#limit}}',
  });

module.exports = {
  idSchema,
  nameSchema,
  nameSchemaLength,
  saleSchema,
};