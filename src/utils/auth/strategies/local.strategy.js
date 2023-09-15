const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const AuthService = require('../../../services/auth.service');

const service = new AuthService();

const localStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
  try {
    // Validate the username
    const user = await service.findByEmail(email);
    if (!user) {
      done(boom.unauthorized('User not found'), false);
    };

    // Validate the password
    const isMatch = await bcrypt.compare(password, user.password); // El primero lo ingresa el usuario y el segundo de la bd
    if (!isMatch) {
      done(boom.unauthorized('Invalid password'), false);
    };
    // Authenticate and return user without password
    delete user.dataValues.password;
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

module.exports = localStrategy;
