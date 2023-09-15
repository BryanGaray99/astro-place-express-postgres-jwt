const { models } = require('../libs/sequelize');

class AuthService {
  constructor() {};

  // Function for login
  async findByEmail(email) {
    const res = await models.User.findOne({
      where: { email },
    });
    return res;
  };
};

module.exports = AuthService;
