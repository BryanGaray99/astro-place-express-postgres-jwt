const { Pool } = require('pg');
const { config } = require('../config');

const options = {};

if (config.env === 'production') {
  options.connectionString = config.pgURL + "?sslmode=require";
} else {
  options.connectionString = config.pgURL;
};

const pool = new Pool(options);

module.exports = pool;
