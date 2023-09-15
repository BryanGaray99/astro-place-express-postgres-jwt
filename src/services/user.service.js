const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');

class UserService {
  constructor() {
  };

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password;
    return newUser;
  };

  async find() {
    const res = await models.User.findAll({
      include: ['customer'],
      attributes: {
        exclude: ['password']
      }
    });
    return res;
  };

  // Function for login
  async findByEmail(email) {
    const res = await models.User.findOne({
      where: { email },
    });
    return res;
  };

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    };
    delete user.dataValues.password;
    return user;
  };

  async update(id, changes) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    } else {
      const res = await user.update(changes);
      delete res.dataValues.password;
      return res;
    }
  };

  async delete(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    } else {
      await user.destroy();
      return { id, message: 'User deleted' };
    }
  };
};

module.exports = UserService;
