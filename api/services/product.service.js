const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class productService {

  constructor() {
  };

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  };

  async find() {
    const res = await models.Product.findAll({
      include: ['category']
    });
    return res;
  };

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category']
    });
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  };

  async update(id, changes) {
    const product = await this.findOne(id);
    const res = await product.update(changes);
    return res;
  };

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  };
};

module.exports = productService;
