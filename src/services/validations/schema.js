const Joi = require('joi');

const idSchema = Joi.number().integer().positive().min(1).required();

const nameSchema = Joi.string().min(5).max(100).required();

const quantitySchema = Joi.number().integer().positive().min(1).required();

module.exports = {
  idSchema,
  nameSchema,
  quantitySchema,
};