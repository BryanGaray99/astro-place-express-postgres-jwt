const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');

class productService {

  constructor() {
  };

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  };

  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    };

    // Paginación
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    };

    // Filtrado dinámico por precio
    const { price } = query;
    if (price) {
      options.where.price = price;
    };

    // Filtrado dinámico por rango de precios
    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.between]: [price_min, price_max]
      };
    }

    const res = await models.Product.findAll(options);
    return res;
  };

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  };

  async update(id, changes) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    } else {
      const res = await product.update(changes);
      return res;
    }
  };

  async delete(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    } else {
      await product.destroy();
      return { id, message: 'Product deleted' };
    }
  };
};

module.exports = productService;
