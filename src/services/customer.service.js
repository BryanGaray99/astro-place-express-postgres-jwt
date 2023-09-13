const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {
  };

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });
    return newCustomer;
  };

  async find() {
    const res = await models.Customer.findAll({
      include: ['user']
    });
    return res;
  };

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  };

  async update(id, changes) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer not found');
    } else {
      const res = await customer.update(changes);
      return res;
    }
  };

  async delete(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer not found');
    } else {
      await customer.destroy();
      return { id, message: 'Customer deleted' };
    }
  }
};

module.exports = CustomerService;
