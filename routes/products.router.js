const express = require('express');
const productService = require('../services/product.service');
const productsRouter = express.Router();

const service = new productService();

// Endpoint to get products
productsRouter.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

// Endpoint to get a product
productsRouter.get('/:id', async (req, res, next) => {
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
productsRouter.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json({
    message: 'Se creó el producto',
    data: newProduct
  })
});

productsRouter.patch('/:id', async (req, res, next) => {
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
