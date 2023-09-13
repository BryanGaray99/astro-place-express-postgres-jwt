const { Sequelize } = require('sequelize');
const { config } = require('../config');
const setUpModels = require('../db/models');

const options = {
  dialect: 'postgres',
  logging: config.env === 'production' ? false : true,
};

const connectionString = config.pgURL;

if (config.env === 'production') {
  options.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  };
};

const sequelize = new Sequelize(connectionString, options);

setUpModels(sequelize);

module.exports = sequelize;
