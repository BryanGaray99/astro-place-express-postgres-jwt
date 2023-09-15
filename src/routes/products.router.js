const express = require('express');
const passport = require('passport');

const ProductService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.middleware');
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema} = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
  try {
    const products = await service.find(req.query);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
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

router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
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

module.exports = router;
