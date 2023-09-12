const express = require('express');

const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.middleware');
const { createOrderSchema, updateOrderSchema, getOrderSchema } = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
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

router.patch('/:id',
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

router.delete('/:id', async (req, res, next) => {
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({
        message : 'Se eliminó el producto',
        id
      });
    } catch (error) {
      next(error);
    }
  }
});

module.exports = router;
