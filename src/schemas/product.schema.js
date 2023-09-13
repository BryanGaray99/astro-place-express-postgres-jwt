const Joi = require ('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const price = Joi.number().integer().min(1);
const description = Joi.string();
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

// Esquema para un POST
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description,
  categoryId: categoryId.required()
});

// Esquema para un PATCH
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId
});

// Esquema para un GET
const getProductSchema = Joi.object({
  id: id.required()
});

// Esquema para query params
const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min', {
    is: Joi.exist(),
    then: Joi.required(),
    otherwise: Joi.optional()
  })
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema
};
