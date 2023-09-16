const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {

  constructor(){
  };

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  };

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  };

  async find() {
    const res = await models.Order.findAll();
    return res;
  };

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'orderProducts'
      ]
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  };

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    });
    return orders;
  };

  async update(id, changes) {
    const order = await models.Order.findByPk(id);
    if (!order) {
      throw boom.notFound('Order not found');
    } else {
      const res = await order.update(changes);
      return res;
    }
  };

  async delete(id) {
    const order = await models.Order.findByPk(id);
    if (!order) {
      throw boom.notFound('Order not found');
    } else {
      await order.destroy();
      return { id, message: 'Order deleted' };
    }
  };
};

module.exports = OrderService;
