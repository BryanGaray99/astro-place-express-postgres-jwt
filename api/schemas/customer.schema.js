const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(1).max(50);
const lastName = Joi.string().min(1).max(50);
const phone = Joi.string();
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);
const nameUser = Joi.string().min(3).max(30);

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    name: nameUser.required(),
    email: email.required(),
    password: password.required(),
    role: role.required(),
  })
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema };
