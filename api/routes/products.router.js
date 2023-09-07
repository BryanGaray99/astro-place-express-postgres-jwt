const express = require('express');
const productService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.middleware');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');

const productsRouter = express.Router();

const service = new productService();

// Endpoint to get products
productsRouter.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

// Endpoint to get a product
productsRouter.get('/:id',
  // Encadenamos el middleware de validación
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({
        message: 'Product not found'
      })
    }
  } catch (error) {
    next(error);
  }
});


// Endpoint to create a product
productsRouter.post('/',
  // Encadenamos el middleware de validación
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json({
    message: 'Se creó el producto',
    data: newProduct
  })
});

productsRouter.patch('/:id',
  // Encadenamos el middleware de validación primero para el id y luego para el body
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json({
      message: 'Se actualizó el producto',
      data: product,
      id
    })
  } catch (error) {
    next(error);
  }
});

productsRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.delete(id);
    res.json({
      message: 'Se eliminó el producto',
      data: product,
      id
    })
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
