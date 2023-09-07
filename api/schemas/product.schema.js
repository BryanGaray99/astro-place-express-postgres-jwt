const Joi = require ('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(30);
const price = Joi.number().integer().min(1);
const image = Joi.string().uri();

// Esquema para un POST
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});

// Esquema para un PATCH
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});

// Esquema para un GET
const getProductSchema = Joi.object({
  id: id.required()
})

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema
};
