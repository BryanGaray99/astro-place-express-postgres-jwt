const express = require('express');

const CustomerService = require('../services/customer.service');
const validatorHandler = require('../middlewares/validator.middleware');
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

router.get('/', async (req, res, next) => {
  try {
    const Customers = await service.find();
    res.json(Customers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const Customer = await service.findOne(id);
    if (Customer) {
      res.json(Customer);
    } else {
      res.status(404).json({
        message: 'Customer not found'
      })
    }
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const Customer = await service.update(id, body);
      res.json({
        message: 'Se actualizó el Customer',
        data: Customer,
        id
      })
    } catch (error) {
      next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({
        message : 'Se eliminó el Customer',
        id
      });
    } catch (error) {
      next(error);
    }
  };
});

module.exports = router;
