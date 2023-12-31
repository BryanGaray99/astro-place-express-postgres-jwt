const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(1).max(50);
const email = Joi.string().email();
const password = Joi.string().min(8);
const token = Joi.string();
const role = Joi.string().min(5);


const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  role: role.required()
});

const updateUserSchema = Joi.object({
  name: name,
  email: email,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const updtateUserPassword = Joi.object({
  password: password.required(),
  token: token.required(),
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema, updtateUserPassword };
