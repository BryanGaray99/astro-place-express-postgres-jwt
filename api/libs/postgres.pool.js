const { Pool } = require('pg');
const { config } = require('../config');

const options = {};

if (config.isProd) {
  options.connectionString = config.dbUrl;
  options.ssl = {
    rejectUnauthorized: false
  }
} else {
    const USER = encodeURIComponent(config.dbUser);
    const PASSWORD = encodeURIComponent(config.dbPassword);
    URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
    options.connectionString = URI;
};

const pool = new Pool();

module.exports = pool;
