const { Pool } = require('pg');
const { config } = require('../config');

const options = {};

if (config.isProd) {
  options.connectionString = config.pgURL + "?sslmode=require";
} else {
    const USER = encodeURIComponent(config.dbUser);
    const PASSWORD = encodeURIComponent(config.dbPassword);
    URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
    options.connectionString = URI;
};

const pool = new Pool(options);

module.exports = pool;
