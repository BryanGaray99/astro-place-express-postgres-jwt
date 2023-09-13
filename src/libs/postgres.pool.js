const { Pool } = require('pg');
const { config } = require('../config');

const options = {};

const pool = new Pool({
  connectionString: config.pgURL,
  ssl: {
    require: true,
    rejectUnauthorized: false
  }

});

module.exports = pool;
