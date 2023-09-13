const { Sequelize } = require('sequelize');
const { config } = require('../config');
const setUpModels = require('../db/models');

const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
};

const sequelize = new Sequelize(config.pgURL, options);

setUpModels(sequelize);

module.exports = sequelize;
