const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.middleware');
const { checkRole } = require('../middlewares/auth.middleware');
const { createOrderSchema, updateOrderSchema, getOrderSchema, addOrderProductsSchema } = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.get('/',
  // passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  // passport.authenticate('jwt', { session: false }),
  // checkRole('admin'),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await service.findOne(id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({
        message: 'Order not found'
      })
    }
  } catch (error) {
    next(error);
  }
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add-products',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  validatorHandler(addOrderProductsSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const order = await service.update(id, body);
      res.json({
        message: 'Se actualizó el producto',
        data: order,
        id
      })
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
