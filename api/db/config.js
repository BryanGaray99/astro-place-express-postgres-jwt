const { config } = require('../config');

module.exports = {
  development: {
    url: config.pgURL,
    dialect: 'postgres',
  },
  production: {
    url: config.pgURL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}
