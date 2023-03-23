const Joi = require('joi');

const idSchema = Joi.number().integer().positive().min(1)
  .required();

const nameSchema = Joi.string().required();
const nameSchemaLength = Joi.string().required().min(5);

const quantitySchema = Joi.number().integer().positive().min(1)
  .required();

module.exports = {
  idSchema,
  nameSchema,
  nameSchemaLength,
  quantitySchema,
};



// .error((errors) => {
//   errors.forEach((err) => {
//     switch (err.code) {
//       case 'string.min':
//         err.message = '"name" length must be at least 5 characters long';
//         break;
//       case 'any.required':
//         err.message = '"name" is required';
//         break;
//       default:
//         err.message = '"name" is not allowed to be empty';
//     }
//   });
//   return errors;
// });